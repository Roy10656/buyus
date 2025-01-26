import React from 'react';
import Front from '../Components/Front';
import CategoryList from '../Components/CategoryList';
import BannerProduct from '../Components/BannerProduct';
import HorizontalCartProduct from '../Components/HorizontalCartProduct';

const Home = () => {
  return (
    <div className='w-full'>
      {/* <Front /> */}
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct category={"airpods"} heading={"Top Airpods"} />
    </div>
  );
}

export default Home;
