import React from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAsync, sortAZ, sortByCategory, sortPriceAsc, sortPriceDesc, sortZA } from "./productSlice";

export const SortingSelector = () => {
	const dispatch = useDispatch();
	const handleChange = async (event) => {
        console.log(event.target.name);
        if(event.target.value === 'all'){
          return dispatch(fetchProductsAsync());
        }
        await dispatch(fetchProductsAsync())
		return dispatch(sortByCategory(event.target.value));
		
	};
    const handleSort = ({target:{value}})=>{
        if(value=== "nameAsc") dispatch(sortAZ())
        if(value=== "nameDesc") dispatch(sortZA())
        if(value=== "priceAsc") dispatch(sortPriceAsc())
        if(value=== "priceDesc") dispatch(sortPriceDesc())
    }
	return (
		<div>

			<label>Categories:<select name="categories" id="categories" onChange={handleChange}> 
               <option value="categories" disabled={true}>Categories</option>
				<option value="all">all</option>
				<option value="clothes">clothes</option>
				<option value="food">food</option>
				<option value="sports">sports</option>
			</select>
            </label>
            <label>Sort By:<select name="SortByAscDesc" id="SortByAscDesc" onChange={handleSort}> 
               <option value="sortBy" disabled={true}>Sort By:</option>
				<option value="nameAsc">Name: A to Z</option>
				<option value="nameDesc">Name: Z to A</option>
				<option value="priceAsc">Price: Low to High</option>
				<option value="priceDesc">Price: High to Low</option>
			</select>
            </label>
		</div>
	);
};
