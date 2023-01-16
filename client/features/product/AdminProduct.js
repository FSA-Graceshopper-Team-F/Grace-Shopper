import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProductAsync } from "./productSlice";
//import { fetchProductAsync, selectSingleProduct } from "./singleProductSlice";
import { Link, useNavigate } from "react-router-dom";
//import { selectAuth } from "../auth/authSlice";

const AdminProduct = () => {

  //const {id} = useSelector(selectAuth)
	//const product = useSelector(selectSingleProduct);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
	//const { productId } = useParams();
	const dispatch = useDispatch();
 // const navigate = useNavigate();
	//const { name, price, imageUrl, description } = product;
	// useEffect(() => {
	// 	dispatch(fetchProductAsync(productId));
	// }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addProductAsync({name, imageUrl, price, description }))
  };

  return (
    <>
      <section className="heading">
        <h2>Create new Product</h2>
        <p>Fill out form below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text"
            placeholder="Product"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
              <label>Product Price</label>
              <input type="text"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Product Description</label>
              <textarea
              name="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Image</label>
              <input type="file"
              placeholder="Image link"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              />
          </div>
          <div className="form-group">
            <button className="btn">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
};






export default AdminProduct
