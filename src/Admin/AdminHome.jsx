

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import ProductView from './ProductView';
import ProductAdd from './ProductAdd';
import ProductUpdate from './ProductUpdate';
import ProductDelete from './ProductDelete';
import UserListView from './UserListView';
import OrderListView from './OrderListView';
import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';
import AdminLogin from '../pages/AdminLogin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../redux/userSlice';
import { getAllOrder } from '../redux/orderSlice';

function AdminHome() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isAdmin, setIsAdmin] = useState(false);
  // const [usersCount, setUsersCount] = useState();
  // const [orderCount, setOrderCount] = useState();
  const {users}=useSelector(state=>state.user)
  const {orders}=useSelector(state=>state.order)
  const dispatch=useDispatch()
   
  const totalUsers = users.length > 0 ? users[users.length - 1].id : 0;
  const ordersCompleted=orders.length > 0 ? orders[orders.length - 1].id : 0;

  const HomeData = {
    totalUsers: totalUsers,
    ordersCompleted: ordersCompleted,
    revenue: 12500,
  };
  

  // useEffect(() => {
  //   const getuser = async () => {
  //     try {
  //       const resUser = await axiosInstance.get('users/');
  //       // console.log("***",resUser.data.results[resUser.data.results.length - 1].id);
        
  //       setUsersCount(resUser.data.results[resUser.data.results.length - 1].id);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getuser();
  // }, []);


  useEffect(()=>{
    dispatch(getAllUser())
    // console.log("ddddddddddd",users);
    dispatch(getAllOrder())
    
    
    

  },[])

  useEffect(() => {
    if (orders.length > 0) {
      // setUsersCount(users[users.length - 1].id);
      console.log('rrr',orders[orders.length-1].id);
      
    }
    
  }, [orders]);
  

  // useEffect(() => {
  //   const getorder = async () => {
  //     try {
  //       const resOrder = await axiosInstance.get('adminorder/');
  //       setOrderCount(resOrder.data[resOrder.data.length - 1].id);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getorder();
  // }, []);

  


  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = Cookies.get('accesstoken');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axiosInstance.get('/current/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.is_admin) {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        navigate('/adminlogin/');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 hidden md:block bg-white shadow-lg sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* mobile */}
      <div className="md:hidden w-full bg-white shadow-md">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[85vh]">

          
          {location.pathname === '/admin' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-10 h-80">
              <div className="p-6 bg-amber-100 text-amber-800 rounded-xl shadow flex flex-col items-center ">
                <span className="text-2xl font-extrabold mt-20">{HomeData.totalUsers}</span>
                <p className="mt-2 text-sm font-semibold">Total Users</p>
              </div>
              <div className="p-6 bg-green-100 text-green-800 rounded-xl shadow flex flex-col items-center">
                <span className="text-2xl font-extrabold mt-20">{HomeData.ordersCompleted}</span>
                <p className="mt-2 text-sm font-semibold">Orders Completed</p>
              </div>
              <div className="p-6 bg-blue-100 text-blue-800 rounded-xl shadow flex flex-col items-center">
                <span className="text-2xl font-extrabold mt-20">₹{HomeData.revenue.toLocaleString()}</span>
                <p className="mt-2 text-sm font-semibold">Revenue</p>
              </div>
            </div>
          )}

          <Routes>
            <Route path='/product_view/' element={<ProductView />} />
            <Route path='/product_add/' element={<ProductAdd />} />
            <Route path='/product_update/:updateId' element={<ProductUpdate />} />
            <Route path='/product_delete/' element={<ProductDelete />} />
            <Route path='/user_view/' element={<UserListView />} />
            <Route path='/order_details/' element={<OrderListView />} />
            <Route path='/adminlogin/' element={<AdminLogin />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
