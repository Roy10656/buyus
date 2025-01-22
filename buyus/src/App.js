import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const location = useLocation(); // Use useLocation hook

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const isAdmin = location.pathname.includes('/admin'); // Correct path check

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)] w-full p-0 '>
          <Outlet />
          
        </main>
        {!isAdmin && <Footer />} {/* Conditionally render Footer */}
      </Context.Provider>
    </>
  );
}

export default App;
