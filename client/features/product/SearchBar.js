import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAsync, sortBySearch } from "./productSlice";

export const SearchBar = () => {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearch = (event) => {
		event.preventDefault();
		dispatch(sortBySearch(searchTerm));
	};
    const handleChange =(event)=>{
        setSearchTerm(event.target.value)
        dispatch(fetchProductsAsync())
    }
	return (
		<div>
			<form onSubmit={handleSearch}>
				<input name="search" placeholder="search" onChange={handleChange} value={searchTerm} type="text"></input>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};
