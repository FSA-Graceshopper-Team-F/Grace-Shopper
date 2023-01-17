import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProductAsync } from "./productSlice";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
	const dispatch = useDispatch();
  const { productId } = useParams();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(editProductAsync({ productId, name, imageUrl, price, description }));
    setName("");
    setImageUrl("");
    setPrice("");
    setDescription("");
  };


  return (
    <>
      <section className="heading">
        <h2>Edit Product</h2>
        <p>Fill out form below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
              <label>Product Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Product Description</label>
              <textarea
                name="description"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Image</label>
              <input
                type="text"
                placeholder="Image link"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
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

export default EditProduct
