import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { fetchProductsAsync, selectProducts } from "./productSlice";
import { Link } from "react-router-dom";
const AllProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  return (
    <div>
      {products && products.length ?
       products.map((product) => (
        <ul
        className="allProducts"
        key={`All products: ${product.id}`}>
          <Link to={`/products/${product.id}`}><li>
            {[product.name, product.price, product.imageUrl]}  </li>
        </Link>        
        </ul>
       )): console.log('---NO PRODUCTS---', null)
    }
    </div>
  )
};
export default AllProducts;








