import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice.js";

export const UserProfile = () => {
	const { email } = useSelector(selectAuth);
	const [user, setUser] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	useEffect(() => {
		user.password && user.password === user.confirmPassword
			? setPasswordsDontMatch(false)
			: setPasswordsDontMatch(true);
	}, [user, updated]);
	const [loading, setLoading] = useState(false);
	const [passwordsDontMatch, setPasswordsDontMatch] = useState(true);
	const [updated, setUpdated] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		if (user.email && user.password && user.confirmPassword) {
			const token = window.localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: token,
				},
			};
			axios
				.put(`api/users/me`, user, config)
				.catch(console.error)
				.finally(() => setLoading(false));
			setUser({ email: "", password: "", confirmPassword: "" });
			setUpdated(true);
			return setTimeout(() => {
				setUpdated(false);
			}, 3000);
		}
		return null;
	};

	const updateUser = (event) => {
		const keyToUpdate = event.target.name;
		setUser((currentValues) => ({
			...currentValues,
			[keyToUpdate]: event.target.value,
		}));
	};
	return (
		<div>
			<h1>My Profile</h1>
			<hr />
			<h3>Order History</h3>
			<Link to="/myOrders">
				<button>View Order History</button>
			</Link>
			<hr />
			<section className="heading">
				<h3>Edit User Profile</h3>
			</section>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input
							name="email"
							onChange={updateUser}
							placeholder={email}
							type="text"
							value={user.email}
						/>
					</div>
					<br />

					<div className="form-group">
						<label>New Password</label>
						<input
							disabled={loading}
							name="password"
							onChange={updateUser}
							placeholder="password"
							type="password"
							value={user.password}
						/>
					</div>
					<div className="form-group">
						<label>Re-Type New Password </label>
						<input
							disabled={loading}
							name="confirmPassword"
							onChange={updateUser}
							placeholder="password"
							type="password"
							value={user.confirmPassword}
						/>
					</div>
					<br />
					{updated ? (
						<div>Your information has been updated! Thank you!</div>
					) : (
						<div className="form-group">
							{passwordsDontMatch ? "Make sure your passwords match" : null}
							<br />
							<button className="btn" disabled={loading || passwordsDontMatch}>
								Click To Update My User Infomation
							</button>
						</div>
					)}
				</form>
			</section>
		</div>
	);
};
