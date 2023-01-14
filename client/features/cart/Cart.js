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
	cartToOrderAsync,
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

	const handleCartToOrder = () => {
		if (id && cart.length) return dispatch(cartToOrderAsync());
		return null;
	};

	return (
		<div className="cart">
			<ul>
				{cartProducts.map((item) => (
					<li key={`Cart item ${item.id}`}>
						{item.name} {item.price} Qty:{item.quantity} ItemTotal:
						{item.price * item.quantity}
						<button
							onClick={() => {
								handleIncreaseQuantity(item);
								handleUpdateCart();
							}}
						>
							I WANT MORE
						</button>
						<button
							onClick={() => {
								handleDecreaseQuantity(item);
								handleUpdateCart();
							}}
						>
							I WANT LESS
						</button>
						<button
							onClick={() => {
								handleRemoveItem(item);
								handleUpdateCart();
							}}
						>
							REMOVE ITEM
						</button>
					</li>
				))}
				Total Price: {totalCartPrice}
			</ul>
		</div>
	);
};

export default Cart;
