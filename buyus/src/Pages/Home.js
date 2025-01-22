import React from 'react'
import Front from '../Components/Front'
import CatagoryList from '../Components/CatagoryList'
import BannerProduct from '../Components/BannerProduct'

const Home = () => {
  return (
    <div className='w-full'>
      
      {/* <Front /> */}
      <CatagoryList />
      <BannerProduct />
      
    </div>
  )
}

export default Home