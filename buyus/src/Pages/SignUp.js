import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signin from '../assest/signin.gif'
import { useState } from 'react'
import imagetoB64 from '../helpers/imagetoB64'
import summaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {
  const [data,setData] = useState({
    fname : "",
    lname : "",
    email : "",
    password : "",
    confpassword : "",
    profilePic : ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name,value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    const imagePic = await imagetoB64(file)

    console.log("imagePic", imagePic)
    setData ((preve) =>{
      return{
        ...preve,
        profilePic : imagePic
      }
    } )
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (data.password === data.confpassword) {
      const dataResponse = await fetch(summaryApi.signUp.url, {
        method : summaryApi.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }

      if (dataApi.error) {
        toast.error(dataApi.message)
      }

    }
    else{
      console.log("password and confirm password should be same !")
    }

    
  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            
            <div className='bg-slate-100 p-5 w-full max-w-sm mx-auto rounded-lg border-black border shadow-2xl '>
                <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
                    <div>
                      <img src={data.profilePic || Signin} alt='Sign In' />
                    </div>
                    <form>
                      <label>
                        <input type='file' className='hidden' onChange={handleUploadPic} />
                        <div className='w-full bg-slate-300/80 text-sm text-center absolute bottom-0 rounded-b-full font-bold text-red-800 cursor-pointer '>
                          Upload Photo
                        </div>
                      </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                  <div className='grid'>
                    <div className='flex container '>
                    <label className='w-full'>First Name : </label>
                    <label className='w-full ml-4'>Last Name : </label>
                    </div>
                    <div className=' container gap-4 flex'>
                    <div className ='bg-white p-2'>
                      <input 
                        type='text' 
                        placeholder='Raju'
                        name='fname'
                        required
                        value={data.fname} 
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                    <div className ='bg-white p-2'>
                      <input 
                        type='text' 
                        placeholder='Roy'
                        name='lname'
                        required
                        value={data.lname} 
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                    </div>
                  </div>
                  <div className='grid'>
                    <label>Email : </label>
                    <div className ='bg-white p-2'>
                      <input 
                        type='email' 
                        placeholder='abcd@email.com'
                        name='email'
                        required
                        value={data.email} 
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                  </div>

                  <div className=''>
                    <label>Password : </label>
                    <div className ='bg-white p-2 flex mb-2'>
                      <input 
                        type='password' 
                        placeholder='********' 
                        name='password'
                        required
                        value={data.password}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                    <label> Confirm Password : </label>
                    <div className ='bg-white p-2 flex'>
                      <input 
                        type='password' 
                        placeholder='********' 
                        name='confpassword'
                        required
                        value={data.confpassword}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                  </div>
                  <button className='bg-purple-600 hover:bg-purple-700 text-white text-lg px-5 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ' >Sign Up</button>

                </form>
                <p className='mt-4 ' > Already have Account ? <Link to={'/login'} className='text-sky-600 hover:underline hover:text-purple-700'>Sign In</Link></p>
            </div>

        </div>
    </section>
  )
}

export default SignUp