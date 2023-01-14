import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import Cart from "../cart/Cart";
import { cartToOrderAsync, selectCart } from "../cart/cartSlice";

const Checkout = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const { id } = useSelector(selectAuth);

	const handleCartToOrder = () => {
		if (id && cart.length) return dispatch(cartToOrderAsync());
		return null;
	};
	return (
		<div>
			Checkout
			<Cart />
			<button onClick={() => handleCartToOrder()}>COMPLETE CHECKOUT</button>
		</div>
	);
};

export default Checkout;
