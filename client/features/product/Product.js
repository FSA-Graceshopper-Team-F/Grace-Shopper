import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductAsync, selectSingleProduct } from "./singleProductSlice";
import {
	addItem,
	increaseQuantity,
	selectCart,
	updateCartAsync,
	updateCartLocalAsync,
} from "../cart/cartSlice";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import EditProduct from "./EditProduct";

export const Product = () => {
	const { isAdmin, id } = useSelector(selectAuth);
	const product = useSelector(selectSingleProduct);
	const cart = useSelector(selectCart);
	const { productId } = useParams();
	const dispatch = useDispatch();
	const { name, price, imageUrl, description } = product;

	useEffect(() => {
		dispatch(fetchProductAsync(productId));
	}, [dispatch, productId]);

	const handleAddToCart = (product) => {
		const doesItExist = cart.find((item) => item.productId === product.id);
		if (doesItExist) {
			return dispatch(increaseQuantity({ productId: product.id }));
		}
		return dispatch(addItem({ productId: product.id, quantity: 1 }));
	};

	const handleUpdateCart = () => {
		dispatch(updateCartLocalAsync());
		if (id) return dispatch(updateCartAsync());
		return null;
	};
	return (
		<div className="singleProduct">
			<div>
				{isAdmin ? (
					<div>
						<EditProduct
							afterEdit={() => dispatch(fetchProductAsync(productId))}
							currentProduct={product}
						/>
					</div>
				) : null}
			</div>
<Link to="/products" className="backToProductsBtn">
				<p>Back to all products</p>
			</Link>
			<img src={`${imageUrl}`} />
			<div className="singleProductInfo">
				<h2>{[name]}</h2>
				<span>{description}</span>

				<h3>${price}</h3>
				<button
				onClick={() => {
					handleAddToCart(product);
					handleUpdateCart();
				}}
			>
				Add to Cart
			</button>
			</div>
			
			
			
		</div>
	);
};
