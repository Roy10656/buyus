import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async() =>{
    const dataResponse = await fetch(summaryApi.current_user.url,{
      method : summaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }

  useEffect(() => {
    /* User Details */
    fetchUserDetails()
  },[])
  return (
    <>
    <Context.Provider value={{
      fetchUserDetails // user details fetch
    }}>
      <ToastContainer />
      
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
