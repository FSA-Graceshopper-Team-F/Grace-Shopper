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
	const { id } = useSelector(selectAuth);
	const [formMissingField, setFormMissingField] = useState(true);
	const [orderPlaced, setOrderPlaced] = useState(false)
	const [userAddress, setUserAddress] = useState({name:"", address:"", city:"",state:"", ZIP:"", country:"", email:""})
	const handleCartToOrder = (event) => {
		event.preventDefault();
		if (id && cart.length) {
			dispatch(cartToOrderAsync(userAddress));
			setUserAddress({name:"", address:"", city:"",state:"", ZIP:"", country:"", email:""})
			setOrderPlaced(true)
			return setTimeout(()=> {
				setOrderPlaced(false)
				navigate("/products")}, 3000)
		}
		return null;
	};
	useEffect(() => {
		if (
			userAddress.name.length &&
			userAddress.address.length &&
			userAddress.city.length &&
			userAddress.state.length &&
			userAddress.ZIP.length &&
			userAddress.country.length &&
			userAddress.email.length &&
			cart.length
		)
			return setFormMissingField(false);
		return setFormMissingField(true);
	}, [userAddress]);
	const updateAddress = (event) => {
		const keyToUpdate = event.target.name
		setUserAddress(currentAddress => ({
			...currentAddress, 
			[keyToUpdate]:event.target.value
		}))
		console.log(userAddress)
	}
	return (
		<div>
			{orderPlaced ? <h1>THANK YOU FOR YOUR ORDER</h1> : "Checkout"}
			<Cart />
			<form id="order-form" onSubmit={(event) => handleCartToOrder(event)}>
				<label htmlFor="userName">Name: </label>
				<input
					name="name"
					value={userAddress.name}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="address">Address: </label>
				<input
					name="address"
					value={userAddress.address}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="city">City: </label>
				<input
					name="city"
					value={userAddress.city}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="state">State/Province: </label>
				<input
					name="state"
					value={userAddress.state}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="ZIP">ZIP Code: </label>
				<input
					name="ZIP"
					value={userAddress.ZIP}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="country">Country: </label>
				<input
					name="country"
					value={userAddress.country}
					onChange={updateAddress}
				></input>
				<br />
				<label htmlFor="email"> Email: </label>
				<input
					name="email"
					type="email"
					required={true}
					value={userAddress.email}
					onChange={updateAddress}
				></input>
				<br />
				{formMissingField ? (
					"Fill Out Order Form To Checkout"
				) : (
					<button type="submit"> Complete Checkout </button>
				)}
				<br />
			</form>
		</div>
	);
};

export default Checkout;
