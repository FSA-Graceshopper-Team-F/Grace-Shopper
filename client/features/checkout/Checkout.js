import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { cartToOrderAsync, selectCart } from "../cart/cartSlice";

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector(selectCart);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [errorStatus, setErrorStatus] = useState(true);
	const [userAddress, setUserAddress] = useState({
		name: "",
		address: "",
		city: "",
		state: "",
		ZIP: "",
		country: "",
		email: "",
	});

	useEffect(() => {
		cartErrorCheck();
	}, [errorStatus, userAddress, cart]);

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
			window.localStorage.removeItem("cart");
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
	function cartErrorCheck() {
		const errorClassCheck = document.querySelector(".error") == null;
		errorClassCheck ? setErrorStatus(false) : setErrorStatus(true);
	}
	return (
		<div >
			{orderPlaced ? <h1 className="thankyoucard">THANK YOU FOR YOUR ORDER</h1> : ""}
			<Cart />
			<form className="checkoutForm" onSubmit={(event) => handleCartToOrder(event)}>
				<label htmlFor="userName">
					Name:
					<input
						type="text"
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
						type="text"
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
						type="text"
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
						type="text"
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
						type="text"
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
						type="text"
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
						type="text"
						required={true}
						value={userAddress.email}
						onChange={updateAddress}
						placeholder="required"
					></input>
				</label>
				<br />
				<button className="completeCheckoutButton" type="submit" disabled={errorStatus}>
					Complete Checkout
				</button>
				<br />
			</form>
		</div>
	);
};

export default Checkout;
