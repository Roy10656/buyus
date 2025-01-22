import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-slate-300 rounded-md p-4 max'>
            <h2 className='text-orange-500 font-bold'>About Us</h2>
            <p>Stay ahead with the latest in electronics. From cutting-edge gadgets to essential devices, we offer top-quality products at unbeatable prices. Don't miss out on our exclusive offers and updates.</p>
            <div className='flex space-x-2'>
              <a href='#'><i className='fab fa-facebook'></i></a>
              <a href='#'><i className='fab fa-twitter'></i></a>
              <a href='#'><i className='fab fa-instagram'></i></a>
              <a href='#'><i className='fab fa-linkedin'></i></a>
            </div>
          </div>
          <div className='bg-slate-300 rounded-md'>
            <h2 className='text-orange-500 font-bold'>Quick Links</h2>
            <ul>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>Shop</a></li>
              <li><a href='#'>About Us</a></li>
              <li><a href='#'>Contact</a></li>
              <li><a href='#'>FAQs</a></li>
              <li><a href='#'>Privacy Policy</a></li>
            </ul>
          </div>
          <div className='bg-slate-300 rounded-md p-4'>
            <h2 className='text-orange-500 font-bold'>Contact Us</h2>
            <p><i className='fas fa-phone'></i> +91 9382924230</p>
            <p><i className='fas fa-envelope'></i> rajuroy07959@gmail.com</p>
            <p><i className='fas fa-map-marker-alt'></i> Andal, Durgapur | 713321</p>
          </div>
          <div className='bg-slate-300 rounded-md p-4'>
            <h2 className='text-orange-500 font-bold'>Newsletter</h2>
            <p>Subscribe to receive updates, exclusive deals, and more.</p>
            <form>
              <input type='email' placeholder='Your email address' className='p-2 border rounded-full w-full mb-2'/>
              <button type='submit' className='bg-orange-500 text-white p-2 rounded w-full'>Subscribe</button>
            </form>
          </div>
        </div>
        <div className='text-center mt-4'>
          <p>© 2024 YourCompany. All Rights Reserved. | Designed with <span className='text-orange-500'>❤</span> by Raju Roy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
