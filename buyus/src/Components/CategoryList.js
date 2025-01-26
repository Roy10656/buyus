import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(summaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            // console.log('API response:', dataResponse); // Log the API response
            if (dataResponse.success) {
                setCategoryProduct(dataResponse.data);
            } else {
                console.error('Failed to fetch category products:', dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // console.log('Category Products:', categoryProduct); // Log to check categoryProduct

    return (
        <div className='mx-auto px-5 py-1 overflow-auto hide-scrollbar w-full'>
            <div className='flex items-center gap-4 justify-between'>
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 animate-pulse' 
                            key={"categoryLoading" + index}>
                        </div>
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link to={"/product-category/" + product?.productCategory} className='mb-4 cursor-pointer' 
                            key={product?.productCategory}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.productCategory} 
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.productCategory}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default CategoryList;
