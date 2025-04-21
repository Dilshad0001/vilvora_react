// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../axiosInstance'

// function UserListView() {

//   const [userList,setUserList]=useState([])

//   useEffect(()=>{
//     const fetchUser=async()=>{
//       try{
//         const res=await axiosInstance.get('/users/')
//         setUserList(res.data)        
//       }catch(error){
//         console.error("user fetch error",error);      
//       }
//     }
//     fetchUser()
//   },[])
//   console.log("uuuuu",userList);
  


//   return (
//     <div>
//       <h1>user list</h1>
//       {userList.map((user,index)=>(
//         <div key={index}>
//           <h1>username: {user.username}</h1>
//           <h1>email: {user.user_email}</h1>
//           <h1>order completed :{user.order_number}</h1>
//           <h1>is blocked : {user.is_active?'False':'True'}</h1>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default UserListView
// ===========================================================================


import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

function UserListView() {

  const [userList, setUserList] = useState([])
  // const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/users/')
        setUserList(res.data)
      } catch (error) {
        console.error("user fetch error", error);
      }
    }
    fetchUser()
  }, [])
  console.log("uuuuu", userList);



  const handleCheckboxChange = async (event, id) => {
    const isChecked = event.target.checked;
  
    try {
      await axiosInstance.put('/users/', {
        id: id,
        is_active: !isChecked,  // Send true or false
      });
    } catch (error) {
      console.error("Update error", error);
    }
  };
  
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
            <th className="text-left px-4 py-2 border-b">User Id</th>
              <th className="text-left px-4 py-2 border-b">Username</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Order Completed</th>
              <th className="text-left px-4 py-2 border-b">Is Blocked</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.id}</td>
                <td className="px-4 py-2 border-b">{user.username}</td>
                <td className="px-4 py-2 border-b">{user.user_email}</td>
                <td className="px-4 py-2 border-b">{user.order_number}</td>
                <td className="px-4 py-2 border-b">{user.is_active ? 'False' : 'True'} -- 
                {/* <button onClick={()=>blockUser(user.id)}>Block User</button> */}
                <label>
                  <input
                    type="checkbox"
                    checked={!user.is_active}
                    onChange={(event) => handleCheckboxChange(event, user.id)}
                  />
                    Block user
                 </label>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserListView
