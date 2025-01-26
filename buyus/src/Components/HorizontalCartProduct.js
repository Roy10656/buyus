import React, { useState, useEffect } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';

const HorizontalCartProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct("airpodes"); // Use the correct category value
      setLoading(false);
      const products = categoryProduct?.data || [];
      setData(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container ml-5 px-1 my-6'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : data.length > 0 ? (
        data.map((product, index) => (
          <div key={product._id || index} style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
            <div style={{ border: '1px solid blue', padding: '5px' }}>
              <img src={product.productImage?.[0] || 'default_image_url'} alt={product.productName || 'Product Image'} />
              <p>{product.productName}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}

export default HorizontalCartProduct;
