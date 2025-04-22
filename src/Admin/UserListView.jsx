

import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

function UserListView() {
  const [userList, setUserList] = useState([])
  const [userActive, setUserActive] = useState([])

  useEffect(() => {
    const activeStatus = userList.map(user => ({
      id: user.id,
      is_active: user.is_active
    }));

    setUserActive(activeStatus);
  }, [userList]); 

  console.log("pppppp--", userList);

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

  const handleCheckboxChange = async (event, id) => {
    const isChecked = event.target.checked;

    try {
      await axiosInstance.put('/users/', {
        id: id,
        is_active: !isChecked,
      });

      setUserList(prevList =>
        prevList.map(user =>
          user.id === id ? { ...user, is_active: !isChecked } : user
        )
      );
    } catch (error) {
      console.error("Update error", error);
    }
  };

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {userList.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.user_email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.order_number}</td>
                <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-2">
                  <span className={`text-sm font-medium ${user.is_active ? 'text-green-600' : 'text-red-500'}`}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!user.is_active}
                      onChange={(event) => handleCheckboxChange(event, user.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-400 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 relative"></div>
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
