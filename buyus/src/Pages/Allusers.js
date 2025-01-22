import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../Components/ChangeUserRole';



const Allusers = () => {
  const [allUser,setAllUser] = useState([])

  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : "",
    fname : "",
    lname : "",
    role : "",
    _id : "",
  })

  const fetchAllUsers = async()=>{
    const fetchData = await fetch(summaryApi.allUser.url,{
      method : summaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUser(dataResponse.data)
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }


  useEffect(() => {
    fetchAllUsers()
  },[])
  return (
    
    <div className='mt-0 min-h-[calc(100vh-138px)] '>
      <p>Users :</p>
      <div className='bg-white pb-4 '>
        <table className='w-full userTable overflow-auto '>
          <thead className='bg-black text-white'>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              allUser.map((el, index) => {
                return(
                  <tr>
                    <td>{index +1}</td>
                    <td>{el?.fname} {el?.lname}</td>
                    <td>{el?.email} </td>
                    <td>{el?.role} </td>
                    <td>{moment(el?.createdAt).format('LL')} </td>
                    <td>
                      <button className='bg-green-200 p-2 rounded-md hover:bg-green-500 hover:text-white m-1' 
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}>
                        <FaUserEdit />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {
          openUpdateRole && (
            <ChangeUserRole 
            onClose={() => setOpenUpdateRole(false)} 
            name={`${updateUserDetails.fname} ${updateUserDetails.lname}`}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callfunc = {fetchAllUsers}
            />
          )
        }
        
      </div>
    </div>
  )
}

export default Allusers