import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='border rounded w-40'> 
      <div className='bg-white hover:bg-slate-200 p-2 rounded flex flex-col items-center h-full'>
        <div className='flex items-center justify-center'>
          {data?.productImage?.[0] ? (
            <img className='object-contain h-24 w-24' src={data.productImage[0]} alt='Product' />
          ) : (
            <p className='text-xs'>No Image Available</p>
          )}
        </div>
        
        <h1 className='text-center text-xs mt-2 truncate w-full'>
          {data?.productName || 'No Name Available'}
        </h1>

        <div className='flex flex-col items-center mt-2'>
          <p className='font-semibold text-xs'>
            {displayINRCurrency(data.sellingPrice)}
          </p>
        </div>

        
        <div className='flex justify-end w-full mt-auto'> 
          <div className='flex justify-end w-full' onClick={() => setEditProduct(true)}>
            <MdEdit size={25} className='p-1 bg-green-100 hover:bg-green-500 rounded-full hover:text-white cursor-pointer' />
          </div>
        </div>

        {/* Edit Product Modal */}
        {editProduct && (
          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
