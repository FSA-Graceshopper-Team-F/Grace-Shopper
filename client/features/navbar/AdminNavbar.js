import React from "react";
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
	return (
		<div className="navBar">
			<Link to="/users">All users</Link>
			<Link to="/addProduct">Add A Product</Link>
		</div>
	);
};

