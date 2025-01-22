import React, { useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';

const Header = () => {

  const user = useSelector(state => state?.user?.user)

  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url,{
      method : summaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()


    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if (data.error){
      toast.error(data.message)
    }
  }

  


  return (
    <header className='h-16 drop-shadow-xl bg-gradient-to-r from-sky-300 to-purple-600 w-full'> 
      <div className='h-full w-full flex items-center px-3 justify-between '>
        <div className=''>
          <Link to={"/"}>
          <Logo w={150} h={2} />
          </Link>
        </div>
        {/*Search Section */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full  focus-within:shadow-white pl-2 bg-white '>
          <input type='text' placeholder='Search for Items' className='w-full h-full rounded-l-full outline-none '/>
          <div className='text-lg min-w-[50px] h-8 bg-sky-400/60 flex items-center justify-center rounded-r-full text-white cursor-pointer hover:bg-sky-400 transition-all'>
            <FaSearch />
          </div>
        </div>

        <div className=' flex items-center gap-7 pr-4 '>

          <div className=' flex relative justify-center'>
            {
              user?._id && (
                <div className='text-xl flex cursor-pointer  ' onClick={()=> setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-9 h-9 rounded-full hover:scale-110' alt={user?.name} />
                    ) : (
                      <span className='text-white hover:scale-110'><FaUser /></span>
                    )
                  }
                  
                </div>
              )
            }
            

            {
              menuDisplay && (
                <div className='absolute bottom-0 top-11 h-fit p-2 bg-white hidden md:block shadow-lg rounded '>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2 ' onClick={()=> setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                  </nav>
                </div>
              )
            }
            
          </div>

          {
            user?._id && (
              <div className='text-3xl flex items-center cursor-pointer relative'>
                <span className='text-white hover:scale-110'><FaCartArrowDown /></span>

                <div className='bg-red-600 text-white absolute rounded-full w-5 p-1 h-5 flex items-center justify-center -top-2 -right-3'>
                 <p className='text-sm'>0</p>
                </div>
              </div>
            )
          }
          
          <div className=' rounded-full  hover:scale-110 '>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 max-h-6 rounded-full hover:text-white hover:bg-sky-600 flex items-center focus-within:shadow-xl text-black bg-sky-300 transition-all'>Logout</button>
              ) : (
                <Link to={"/login"}>
              <button className='w-20 bg-sky-200 hover:bg-sky-600 rounded-full hover:text-white'>Login</button>
            </Link>
              )
            }
            
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header