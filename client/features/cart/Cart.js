import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, adjustQuantity, selectCart } from "./cartSlice";

const Cart = () => {
  const { items, totalQuantity, totalCost } = useSelector(selectCart);
  const dispatch = useDispatch();
 console.log(items, "this is items")
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
            <tr key={`Cart item: ${item.id}`}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() =>
                    handleAdjustQuantity(item, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    handleAdjustQuantity(item, item.quantity - 1)
                  }
                >
                  -
                </button>
              </td>
              <td>
                <button onClick={() => handleRemoveItem(item)}>
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