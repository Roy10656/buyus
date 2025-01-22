import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { Link } from 'react-router-dom'

const CatagoryList = () => {

    const [catagoryProduct, setCatagoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const catagoryLoading = new Array(13).fill(null)

    const fetchCatagoryProduct = async() => {
        setLoading(true)
        const response = await fetch(summaryApi.catagoryProduct.url)
        
        const dataResponse = await response.json()
        setLoading(false)
        setCatagoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCatagoryProduct()
    },[])

    return (
        <div className=' mx-auto p-4 overflow-auto hide-scrollbar w-full'>
            <div className='flex items-center gap-4 justify-between' >
                {loading ? (
                    
                    catagoryLoading.map((el, index) => {
                        return(
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 animate-pulse' 
                            key={"catagoryLoading"+index}>

                            </div>
                        )
                    })
                    
                    

                    
                ) : (
                    catagoryProduct.map((product, index) => (
                        <Link to = {"/product-catagory/"+ product?.productCatagory} className='mb-4 cursor-pointer' 
                        key={product?.productCatagory}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center' >
                                <img src={product?.productImage[0]} alt={product?.catagory} 
                                className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                
                            </div>
                            <p className='text-center text-sm md:text-base capitalize '>{product?.productCatagory}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CatagoryList
