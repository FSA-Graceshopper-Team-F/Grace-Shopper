import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import DeleteButton from "./DeleteButton";
import { SortingSelector } from "./SortingSelector";
import { SearchBar } from "./SearchBar";
const AllProducts = () => {
  const products = useSelector(selectProducts);
  const { isAdmin } = useSelector(selectAuth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);


  return (
    <div className="productsPage">
      <div className="productsTextCard">

        <div className="productsTextCardText">
        <h1 >Shop products</h1>
        <h3 >Our most popular products based on sales. Updated frequently.</h3>
        </div>
       <div className="searchCatDiv">
       <SearchBar />
        <SortingSelector />
       </div>
      </div>
      <div className="productGrid">

        {products && products.length ?
          products.map((product) => (

            <ul
              // className="productGrid"
              key={`All products: ${product.id}`}>
              <div className="productCard">
                <Link className="productCardLink" to={`/products/${product.id}`}>
                  <img src={`${product.imageUrl}`} />
                  <h1>{product.name}</h1>
                  <p>${product.price}</p>
                </Link>
              </div>
              {isAdmin ? (<DeleteButton productId={product.id} productName={product.name} />) : null}
            </ul>
          )) : console.log('---NO PRODUCTS---', null)
        }
      </div>
    </div>
  )
};
export default AllProducts;








