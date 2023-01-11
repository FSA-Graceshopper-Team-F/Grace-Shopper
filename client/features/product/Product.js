import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductAsync, selectSingleProduct } from "./singleProductSlice";

export const Product = () => {
	const product = useSelector(selectSingleProduct);
	const { productId } = useParams();
	const dispatch = useDispatch();
	const { name, price, imageUrl, description } = product;
	console.log(selectSingleProduct);
	useEffect(() => {
		dispatch(fetchProductAsync(productId));
	}, [dispatch]);
	return (
		<div className="singleProduct">
			<h2>{[name, price, imageUrl, description]}</h2>
		</div>
	);
};
