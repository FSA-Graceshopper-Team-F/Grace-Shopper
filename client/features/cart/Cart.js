import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { fetchProductsAsync, selectProducts } from "../product/productSlice";
import { storeProductDetails } from "./cartProductDetailsSlice";
import {
	selectCart,
	increaseQuantity,
	decreaseQuantity,
	removeItem,
	updateCartAsync,
	updateCartLocalAsync,
} from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const cart = useSelector(selectCart);
	const { id } = useSelector(selectAuth);
	useEffect(() => {
		dispatch(fetchProductsAsync())
		dispatch(storeProductDetails(cartProducts))
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
		dispatch(updateCartLocalAsync())
	};

	const handleDecreaseQuantity = ({ id: productId }) => {
		dispatch(decreaseQuantity({ productId }));
		dispatch(updateCartLocalAsync())
	};

	const handleRemoveItem = ({ id: productId }) => {
		dispatch(removeItem({ productId }));
		dispatch(updateCartLocalAsync())
	};

	const handleUpdateCart = () => {
		dispatch(updateCartLocalAsync())
		if (id) return dispatch(updateCartAsync());
		return null;
	};
	return (
		<div className="cart">
			<div className="cartStandardText">
			<h1>Review your cart.</h1>
			<h2>Free delivery and free returns.</h2>
			</div>
			<ul >
				{cartProducts.map((item) => (
					<li className="cartProductCard" key={`Cart item ${item.id}`}>
						<img src={item.imageUrl} width="75" height="75" />
						<p className="cartItemName">Item:{item.name}{" "}</p>
						<div className="moreLessButtons">
							<button
								onClick={() => {
									handleIncreaseQuantity(item);
									handleUpdateCart();
								}}
								className="moreButton"
							>
								+
							</button>{" "}
							<p className="cartQuantity">Qty:{item.quantity}</p>
							<button className="lessButton"
								onClick={() => {
									handleDecreaseQuantity(item);
									handleUpdateCart();
								}}
							>
								-
							</button>{" "}
						</div>

						<button className="removeButton"
							onClick={() => {
								handleRemoveItem(item);
								handleUpdateCart();
							}}
						>
							Remove
						</button><br />



						<p className="cartPrice">Price:{item.price}</p>

						<hr />
					</li>
				))}
				
				<div className="orderSummaryItems">
				<h2>Order Summary</h2>
				<p className="cartTotalQty">Total Qty: {cartQuantity}</p>
				<p className="cartTotalPrice">Total Price: ${totalCartPrice}.00</p>
				</div>
			</ul>
		</div>
	);
};

export default Cart;
