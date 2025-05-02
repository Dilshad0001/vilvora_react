


import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../redux/userSlice'

function UserListView() {
  const { users, nextPage, previousPage } = useSelector(state => state.user)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllUser())
  },[])

  const fetchNextPage = () => {
    if (nextPage) dispatch(getAllUser(nextPage))
  }

  const fetchPreviousPage = () => {
    if (previousPage) dispatch(getAllUser(previousPage))
  }



  const toggleBlockStatus = async (userId, currentStatus) => {

    try {
      console.log(("in tryyyy"));
      
      await axiosInstance.put(`/users/`, {
        is_active: !currentStatus,
        id:userId,
      })
      dispatch(getAllUser()) 
    } catch (error) {
      console.log(("in catchee"));
      
      console.error("Error toggling user status:", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Completed</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Block Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>    
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.user_email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.order_number}</td>
                <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-2">
                  <span className={`text-sm font-medium ${user.is_active ? 'text-green-600' : 'text-red-500'}`}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                  
                </td>

                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => toggleBlockStatus(user.id, user.is_active)}
                    className={`px-3 py-1 rounded-md text-white ${user.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {user.is_active ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={fetchPreviousPage}
          disabled={!previousPage}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={fetchNextPage}
          disabled={!nextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserListView
