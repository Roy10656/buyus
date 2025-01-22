import { Link, useNavigate } from 'react-router-dom'
import Signin from '../assest/signin.gif'
import { useContext, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'




const Login = () => {
  const [data,setData] = useState({
    email : "",
    password : ""
  })
  const navigate = useNavigate()
  const { fetchUserDetails } = useContext(Context)

  const handleOnChange = (e) => {
    const { name,value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(summaryApi.signIn.url, {
      method : summaryApi.signIn.method,
      credentials :'include' ,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)

      navigate('/')
      fetchUserDetails()
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }


  }

  console.log("login data", data)

  return (

    <section id='login'>
        <div className='mx-auto container p-4'>
            
            <div className='bg-slate-100 p-5 w-full max-w-sm mx-auto rounded-lg border-black border shadow-2xl '>
                <div className='w-20 h-20 mx-auto'>
                    <img src={Signin} alt='Sign In' />
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                  <div className='grid'>
                    <label>Email : </label>
                    <div className ='bg-white p-2'>
                      <input 
                        type='email' 
                        placeholder='abcd@email.com'
                        name='email'
                        value={data.email} 
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                  </div>

                  <div>
                    <label>Password : </label>
                    <div className ='bg-white p-2 flex'>
                      <input 
                        type='password' 
                        placeholder='********' 
                        name='password'
                        value={data.password}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent' />
                    </div>
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-purple-700 mt-2' >
                      Forgot Password ?
                    </Link>
                  </div>

                  <button className='bg-purple-600 hover:bg-purple-700 text-white text-lg px-5 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ' >Login</button>

                </form>
                <p className='mt-4 ' >Don't have Account ? <Link to={'/sign-up'} className='text-sky-600 hover:underline hover:text-purple-700'>Sign Up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login