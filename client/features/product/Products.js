import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
import AdminProduct from "./AdminProduct";
import { selectAuth } from "../auth/authSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);
  const { isAdmin } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <div>
      {isAdmin ? (
					<div>
						<AdminProduct />
					</div>
				) : null}

      </div>
      {products && products.length ?
       products.map((product) => (
        <ul
        className="allProducts"
        key={`All products: ${product.id}`}>
          <Link to={`/products/${product.id}`}>
            <img src={`${product.imageUrl}`}/>
            <li>
            {[product.name, product.price, product.imageUrl]}  </li>
        </Link>
        </ul>
       )): console.log('---NO PRODUCTS---', null)
    }
    </div>
  )
};
export default AllProducts;








