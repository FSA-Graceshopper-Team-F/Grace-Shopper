import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductAsync, selectSingleProduct } from "./singleProductSlice";
import { selectCart } from "../cart/cartSlice";
export const Product = () => {
	const product = useSelector(selectSingleProduct);
	const cart = useSelector(selectCart);
	const { productId } = useParams();
	const dispatch = useDispatch();
	const { name, price, imageUrl, description } = product;
	useEffect(() => {
		dispatch(fetchProductAsync(productId));
	}, [dispatch]);
	const handleAddToCart = (product) => {
		cart.items.map((item) => {
			if (product.id !== item.id);
		});
		// dispatch(addItem({ ...product, quantity: 1 }));
	};
	console.log(cart)
	return (
		<div className="singleProduct">
			<h2>{[name, price, imageUrl, description]}</h2>
			<button onClick={() => handleAddToCart(product)}>Add to Cart</button>
		</div>
	);
};
