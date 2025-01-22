import React, { useEffect, useState } from 'react'
import Image1 from '../assest/banner/img1.webp'
import Image2 from '../assest/banner/img2.webp'
import Image3 from '../assest/banner/img3.jpg'
import Image4 from '../assest/banner/img4.jpg'
import Image5 from '../assest/banner/img5.webp'

import Image1Mobile from '../assest/banner/img1_mobile.jpg'
import Image2Mobile from '../assest/banner/img2_mobile.webp'
import Image3Mobile from '../assest/banner/img3_mobile.jpg'
import Image4Mobile from '../assest/banner/img4_mobile.jpg'
import Image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";


const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(1)

    const desktopImage = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5
    ]

    const mobileImage = [
        Image1Mobile,
        Image2Mobile,
        Image3Mobile,
        Image4Mobile,
        Image5Mobile
    ]

    const nextImage = () => {
        if ((desktopImage.length - 1) > currentImage) {
            setCurrentImage(preve => preve + 1) ;
        }
        else{
            setCurrentImage(0);
        }
        
    }

    const prevImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1);
        }
        if (currentImage == 0) {
            setCurrentImage(desktopImage.length - 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImage.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        },5000)

        return() => clearInterval(interval)
    },[currentImage])

  return (

    <div className=' mx-auto rounded w-full px-7 '>
        <div className=' h-56 md:h-80 w-full bg-slate-200 relative '>

            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1 '><FaAngleLeft /></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                </div>
            </div>

            {/* Desktop and tablet version */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImage.map((imageURl, index) =>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' 
                            key={imageURl}
                            style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>

             {/* Mobile version */}
             <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImage.map((imageURl, index) =>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' 
                            key={imageURl}
                            style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    </div>
  )
}

export default BannerProduct