import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductView from './ProductView';
import ProductAdd from './ProductAdd';
import ProductUpdate from './ProductUpdate';
import ProductDelete from './ProductDelete';
import UserListView from './UserListView';
import OrderListView from './OrderListView';

function AdminHome() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path='/product_view/' element={<ProductView />} />
          <Route path='product_add/' element={<ProductAdd />} />
          <Route path='product_update/:updateId' element={<ProductUpdate />} />
          <Route path='product_delete/' element={<ProductDelete />} />
          <Route path='user_view/' element={<UserListView />} />
          <Route path='order_details/' element={<OrderListView />} />
          <Route path='/' element={<h1 className="text-2xl font-bold">Welcome Admin</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminHome;
