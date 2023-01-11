import React, { useEffect } from 'react'

export const Product = () => {
  const product = useSelector();
  const {name, price, imageUrl, description} = product;

  useEffect(() => {

  }, [])
  return (
    <div className='singleProduct'>
      <h2>
        {[name, price, imageUrl, description]}
      </h2>
    </div>
  )
};

