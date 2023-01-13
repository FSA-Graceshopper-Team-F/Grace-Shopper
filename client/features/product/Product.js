import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductAsync, selectSingleProduct } from "./singleProductSlice";
import { addItem, increaseQuantity, selectCart } from "../cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

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
		const doesItExist = cart.find((item) => item.productId === product.id);
		if (doesItExist) {
			return dispatch(increaseQuantity({ productId: product.id }));
		}
		return dispatch(addItem({ productId: product.id, quantity: 1 }));
	};

	return (
		<div className="singleProduct">
			<Link to="/products">Back to Products</Link>
			<h2>{[name, price, description]}</h2>
			<img src={`${product.imageUrl}`} />
			<button onClick={() => handleAddToCart(product)}>Add to Cart</button>
		</div>
	);
};