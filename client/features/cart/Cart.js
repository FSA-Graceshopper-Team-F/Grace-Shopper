import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { fetchProductsAsync, selectProducts } from "../product/productSlice";
import {
	selectCart,
	increaseQuantity,
	decreaseQuantity,
	removeItem,
	updateCartAsync,
} from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const cart = useSelector(selectCart);
	const { id } = useSelector(selectAuth);
	useEffect(() => {
		dispatch(fetchProductsAsync());
	}, [dispatch, cart]);

	if (allProducts.length === 0) return null;

	const getProductById = (id) =>
		allProducts.find((product) => product.id === id);

	const cartProducts = cart.map((item) => ({
		...item,
		...getProductById(item.productId),
	}));

	const cartQuantity = cart.length
		? cart.reduce((total, { quantity }) => total + quantity, 0)
		: 0;

	const totalCartPrice = cartProducts.reduce(
		(total, { price, quantity }) => total + price * quantity,
		0
	);

	const handleIncreaseQuantity = ({ id: productId }) => {
		dispatch(increaseQuantity({ productId }));
	};

	const handleDecreaseQuantity = ({ id: productId }) => {
		dispatch(decreaseQuantity({ productId }));
	};

	const handleRemoveItem = ({ id: productId }) => {
		dispatch(removeItem({ productId }));
	};

	const handleUpdateCart = () => {
		if (id) return dispatch(updateCartAsync());
		return null;
	};

	return (
		<div className="cart">
			<ul>
				{cartProducts.map((item) => (
					<li key={`Cart item ${item.id}`}>
						Item:{item.name}{" "}
						<button
							onClick={() => {
								handleIncreaseQuantity(item);
								handleUpdateCart();
							}}
						>
							+
						</button>{" "}
						<button
							onClick={() => {
								handleDecreaseQuantity(item);
								handleUpdateCart();
							}}
						>
							-
						</button>{" "}
						<button
							onClick={() => {
								handleRemoveItem(item);
								handleUpdateCart();
							}}
						>
							X
						</button><br/>
						Qty:{item.quantity}<br/>
						Price:{item.price}<br/>
						ItemTotal:${item.price * item.quantity}.00{" "}
						<hr />
					</li>
				))}
				Total Qty: {cartQuantity}<br/>
				Total Price: ${totalCartPrice}.00
			</ul>
		</div>
	);
};

export default Cart;
