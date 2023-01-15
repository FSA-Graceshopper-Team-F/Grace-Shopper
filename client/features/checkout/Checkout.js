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
	const [name, setName] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");
	const [stateAddress, setStateAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [country, setCountry] = useState("United States");
	const [email, setEmail] = useState("");
	const [formMissingField, setFormMissingField] = useState(true);
	const [orderPlaced, setOrderPlaced] = useState(false)
	const address = {
		name,
		address: streetAddress,
		city,
		state: stateAddress,
		ZIP: zipCode,
		country,
		email,
	};
	const handleCartToOrder = (event) => {
		event.preventDefault();
		if (id && cart.length) {
			dispatch(cartToOrderAsync(address));
			setName("");
			setStreetAddress("");
			setCity("");
			setStateAddress("");
			setZipCode("");
			setCountry("");
			setEmail("");
			setOrderPlaced(true)
			setTimeout(()=> {
				setOrderPlaced(false)
				navigate("/products")}, 3000)
		}
		return null;
	};
	useEffect(() => {
		if (
			address.name.length &&
			address.address.length &&
			address.city.length &&
			address.state.length &&
			address.ZIP.length &&
			address.country.length &&
			address.email.length &&
			cart.length
		)
			return setFormMissingField(false);
		return setFormMissingField(true);
	}, [address]);

	return (
		<div>
			{orderPlaced ? <h1>THANK YOU FOR YOUR ORDER</h1> : "Checkout"}
			<Cart />
			<form id="order-form" onSubmit={(event) => handleCartToOrder(event)}>
				<label htmlFor="userName">Name: </label>
				<input
					name="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				></input>
				<br />
				<label htmlFor="userStreetAddress">Address: </label>
				<input
					name="streetAddress"
					value={streetAddress}
					onChange={(event) => setStreetAddress(event.target.value)}
				></input>
				<br />
				<label htmlFor="userCity">City: </label>
				<input
					name="streetAddress"
					value={city}
					onChange={(event) => setCity(event.target.value)}
				></input>
				<br />
				<label htmlFor="userStateAddress">State/Province: </label>
				<input
					name="stateAddress"
					value={stateAddress}
					onChange={(event) => setStateAddress(event.target.value)}
				></input>
				<br />
				<label htmlFor="userZipCode">ZIP Code: </label>
				<input
					name="zipCode"
					value={zipCode}
					onChange={(event) => setZipCode(event.target.value)}
				></input>
				<br />
				<label htmlFor="userCountry">Country: </label>
				<input
					name="country"
					value={country}
					onChange={(event) => setCountry(event.target.value)}
				></input>
				<br />
				<label htmlFor="email"> Email: </label>
				<input
					name="description"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
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
