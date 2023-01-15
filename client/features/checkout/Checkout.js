import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import Cart from "../cart/Cart";
import { cartToOrderAsync, selectCart } from "../cart/cartSlice";

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector(selectCart);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [userAddress, setUserAddress] = useState({
		name: "",
		address: "",
		city: "",
		state: "",
		ZIP: "",
		country: "",
		email: "",
	});
	const handleCartToOrder = (event) => {
		event.preventDefault();
		if (cart.length) {
			dispatch(cartToOrderAsync(userAddress, cart));
			setUserAddress({
				name: "",
				address: "",
				city: "",
				state: "",
				ZIP: "",
				country: "",
				email: "",
			});
			setOrderPlaced(true);
			return setTimeout(() => {
				setOrderPlaced(false);
				navigate("/products");
			}, 3000);
		}
		return null;
	};

	const updateAddress = (event) => {
		const keyToUpdate = event.target.name;
		setUserAddress((currentAddress) => ({
			...currentAddress,
			[keyToUpdate]: event.target.value,
		}));
	};
	return (
		<div>
			{orderPlaced ? <h1>THANK YOU FOR YOUR ORDER</h1> : "Checkout"}
			<Cart />
			<form id="order-form" onSubmit={(event) => handleCartToOrder(event)}>
				<label htmlFor="userName">
					Name:
					<input
						name="name"
						value={userAddress.name}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="address">
					Address:
					<input
						name="address"
						value={userAddress.address}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="city">
					City:
					<input
						name="city"
						value={userAddress.city}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="state">
					State/Province:
					<input
						name="state"
						value={userAddress.state}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="ZIP">
					ZIP Code:
					<input
						name="ZIP"
						value={userAddress.ZIP}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="country">
					Country:
					<input
						name="country"
						value={userAddress.country}
						required={true}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<label htmlFor="email">
					{" "}
					Email:
					<input
						name="email"
						type="email"
						required={true}
						value={userAddress.email}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<button type="submit"> Complete Checkout </button>
				<br />
			</form>
		</div>
	);
};

export default Checkout;
