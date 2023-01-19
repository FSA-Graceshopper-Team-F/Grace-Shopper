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

	const handleRemoveItem = ({ productId }) => {
		dispatch(removeItem(productId));
		dispatch(updateCartLocalAsync())
	};

	const handleUpdateCart = () => {
		dispatch(updateCartLocalAsync())
		if (id) return dispatch(updateCartAsync());
		return null;
	};
	return (
		<div className="cartPage">
			<div >
				<h1>Review your cart.</h1>
				
			</div>
			<ul >
				{cartProducts.map((item) => (
					<li key={`Cart item ${item.productId}`}>
						{!item.name ? <div className="error">DELETE THIS ITEM IT IS NO LONGER AVAILABLE<button onClick={() => {
							handleRemoveItem(item);
							handleUpdateCart(item.productId);
						}}>Remove</button><hr /></div> :
							<div className="cartProductCard">
								<img src={item.imageUrl} width="75" height="75" /><br />

								<div className="cartProductCardInfo">
								<h1>{item.name}{" "}</h1>
								<div className="cartProductCardButtons">
									<button className="adjustQtyBtn" onClick={() => {
											handleIncreaseQuantity(item);
											handleUpdateCart();
										}}>
										+
									</button>{" "}
									<h3>Total:{item.quantity}</h3>
									<button className="adjustQtyBtn"
										onClick={() => {
											handleDecreaseQuantity(item);
											handleUpdateCart();
										}}
									>
										-
									</button>{" "}
									<button className="removeItemButton"
									onClick={() => {
										handleRemoveItem(item);
										handleUpdateCart(item.productId);
									}}
								>
									Remove
								</button>
								</div>
							
								<h3 className="cartProductPrice">Price: ${item.price}</h3>
								</div>
								<div className="cartTotalPrice">Total Price: ${item.price * item.quantity}.00</div>
							</div>}
					</li>
				))}
				<div className="orderSummary">
					<h2>Order Summary</h2>
					{Number.isNaN(totalCartPrice) ? null : <p >Total Quantity: ${cartQuantity}</p>}<br />
					{Number.isNaN(totalCartPrice) ? "Some Products no longer available remove them from cart" : <p >Total Price: ${totalCartPrice}.00</p>}
				</div>
			</ul>
		</div>
	);
};

export default Cart;
