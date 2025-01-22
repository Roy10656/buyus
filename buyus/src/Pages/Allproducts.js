import React, { useEffect, useState } from 'react';
import UploadProduct from '../Components/UploadProduct';
import AdminProductCard from '../Components/AdminProductCard'; 
import summaryApi from '../common';

const Allproducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);

    const fetchAllProduct = async () => {
        console.log(summaryApi);
        if (!summaryApi?.allproduct?.url) {
            console.error("URL is undefined!");
            return;
        }
        const response = await fetch(summaryApi.allproduct.url);
        const dataResponse = await response.json();
        console.log("API Response:", dataResponse);
        setAllProduct(dataResponse?.data || []);
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    useEffect(() => {
        console.log("All Products:", allProduct); // Log to check allProduct
    }, [allProduct]);

    return (
        <div className='mt-0'>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button
                    className='border-2 border-yellow-500 text-yellow-700 font-bold py-1 px-3 rounded-full hover:text-white hover:bg-yellow-500 transition-all'
                    onClick={() => setOpenUploadProduct(true)}>
                    Upload Product
                </button>
            </div>
            <div className='flex px-3 items-center flex-wrap gap-3 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
                {allProduct.length > 0 ? (
                    allProduct.map((product, index) => (
                        <AdminProductCard key={index} data={product} fetchdata={fetchAllProduct}/>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>}
        </div>
    );
};

export default Allproducts;
