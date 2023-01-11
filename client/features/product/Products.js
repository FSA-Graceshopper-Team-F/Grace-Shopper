import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { addItem } from "../cart/cartSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      {products && products.length
        ? products.map((product) => {
            const itemInCart = items.find(
              (item) => item.product.id === product.id
            );
            const quantity = itemInCart ? itemInCart.quantity : 0;
            return (
              <ul className="allProducts" key={`All products: ${product.id}`}>
                <li>
                  {[product.name, product.price, product.imageUrl]}
                  <p>Quantity in cart: {quantity}</p>
                  <button onClick={() => dispatch(addItem({ product }))}>
                    Add to Cart
                  </button>
                </li>
              </ul>
            );
          })
        : console.log("---NO PRODUCTS---", null)}
    </div>
  );
};

export default AllProducts;
