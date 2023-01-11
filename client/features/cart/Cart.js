import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, adjustQuantity } from "./cartSlice";

const Cart = () => {
  const { items, totalQuantity, totalCost } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const handleAddItem = (product) => {
    dispatch(addItem({ product }));
  };
  const handleRemoveItem = (product) => {
    dispatch(removeItem({ product }));
  };
  const handleAdjustQuantity = (product, quantity) => {
    dispatch(adjustQuantity({ product, quantity }));
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Adjust Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`Cart item: ${item.product.id}`}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.price * item.quantity}</td>
              <td>
                <button
                  onClick={() =>
                    handleAdjustQuantity(item.product, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    handleAdjustQuantity(item.product, item.quantity - 1)
                  }
                >
                  -
                </button>
              </td>
              <td>
                <button onClick={() => handleRemoveItem(item.product)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Cost: {totalCost}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;