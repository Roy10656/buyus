import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCatagory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        productCategory: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const [uploadProductImageInput, setUploadProductImageInput] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        setUploadProductImageInput(file.name);
        console.log("file", file);
        try {
            const uploadImageCloudinary = await uploadImage(file);
            console.log("uploadImageCloudinary", uploadImageCloudinary);
            if (uploadImageCloudinary && uploadImageCloudinary.url) {
                setData(prevData => ({
                    ...prevData,
                    productImage: [...prevData.productImage, uploadImageCloudinary.url]
                }));
                console.log("upload image", uploadImageCloudinary.url);
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Failed to upload image", error);
        }
    };

    const handleDeleteProductImage = async(index) => {
        const newProductImage  = [...data.productImage]
        newProductImage.splice(index, 1)

        setData(prevData => ({
            ...prevData,
            productImage: [...newProductImage]
        }));
    }

    {/** Upload Product */}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Data being sent:', data); // Log data being sent
            const response = await fetch(summaryApi.uploadProduct.url, { // await here
                method: summaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            console.log('Raw response:', response); // Log the raw response
            
            if (response.ok && response.headers.get("content-type").includes("application/json")) {
                const responseData = await response.json(); // parsed JSON response
                console.log('Response Data:', responseData); // Log parsed response data
                
                if (responseData.success) {
                    toast.success(responseData.message);
                    onClose();
                    fetchData()
                } else if (responseData.error) {
                    toast.error(responseData.message);
                }
            } else {
                console.error("Response not JSON or error status");
                console.error(await response.text()); // Log the text of the response for debugging
            }
        } catch (error) {
            console.error('Failed to upload product:', error);
        }
    };

    return (
        <div className='bg-slate-200/35 fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden flex flex-col'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='text-2xl w-fit ml-auto hover:text-yellow-500 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>
                <form className='grid p-4 gap-2 flex-grow overflow-y-auto pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        className='bg-slate-100 p-2 border rounded'
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Enter Product Name'
                        required
                        value={data.productName}
                        onChange={handleOnChange}
                    />
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        className='bg-slate-100 p-2 border rounded'
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='Enter Brand Name'
                        value={data.brandName}
                        required
                        onChange={handleOnChange}
                    />
                    <label htmlFor='productCategory' className='mt-3'>Product Category :</label>
                    <select
                        name='productCategory'
                        value={data.productCategory}
                        className='bg-slate-100 p-2 border rounded'
                        required
                        onChange={handleOnChange}
                    >
                        <option value="">Select Option</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput' className='cursor-pointer'>
                        <div className='p-2 bg-slate-100 border rounded w-full h-32 flex justify-center items-center'>
                            <div className='text-slate-500 flex justify-center items-center gap-2 flex-col'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input hidden type='file' id='uploadImageInput' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img src={el} 
                                            alt={`Product ${index}`} 
                                            width={80} 
                                            height={80} 
                                            className='bg-slate-100 border' />

                                        <div className='absolute bottom-0 right-0 p-1 bg-sky-500 text-white rounded-full cursor-pointer hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                        )}
                    </div>
                    {/* Add other fields (description, price, sellingPrice) in a similar manner */}
                    <label htmlFor='price'>Price :</label>
                    <input
                        className='bg-slate-100 p-2 border rounded'
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Enter Product Price'
                        value={data.price}
                        required
                        onChange={handleOnChange}
                    />

                    <label htmlFor='sellingPrice'>Selling Price :</label>
                    <input
                        className='bg-slate-100 p-2 border rounded'
                        type='number'
                        id='sellingPrice'
                        name='sellingPrice'
                        placeholder='Enter Selling Price'
                        value={data.sellingPrice}
                        required
                        onChange={handleOnChange}
                    />

                    <label htmlFor='description'>Product Description :</label>
                    <textarea className='h-28 bg-slate-100 border resize-none p-2' 
                        id='description' 
                        name='description' 
                        placeholder='Enter Product Description' 
                        rows={3} 
                        value={data.description}
                        required
                        onChange={handleOnChange}>
                    </textarea>

                    <button className='px-3 py-1 bg-sky-500 rounded-full font-bold text-white mb-2 mt-10 hover:bg-sky-600 transition-all'>Upload Product</button>
                </form>
            </div>
        </div>
    );
};

export default UploadProduct;