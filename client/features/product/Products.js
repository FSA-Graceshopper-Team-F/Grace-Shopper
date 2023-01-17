import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import DeleteButton from "./DeleteButton";
const AllProducts = () => {
  const products = useSelector(selectProducts);
  const { isAdmin } = useSelector(selectAuth) 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);



  return (
    <div>
      <div className="productsTextCard">
        <h1 className="productsTitle">Shop products</h1>
        <h3 className="productsText">Our most popular products based on sales. Updated frequently.</h3>
      </div>
      <div>
        {isAdmin ? (
          <div>
            <AddProduct />
          </div>
        ) : null}

      </div>
      {products && products.length ?
        products.map((product) => (

          <ul
            className="productGrid"
            key={`All products: ${product.id}`}>
            <Link to={`/products/${product.id}`} className="productCard">
              
              <img src={`${product.imageUrl}`} className="productImage"/>
              <li className="productText">
                {[product.name, product.price, product.imageUrl]}  </li>
            </Link>
            {isAdmin ? (<DeleteButton productId={product.id} productName={product.name} />) : null}
          </ul>
        )) : console.log('---NO PRODUCTS---', null)
      }
    </div>
  )
};
export default AllProducts;








