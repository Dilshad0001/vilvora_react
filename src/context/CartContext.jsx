

import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

export const CartItemsContext = createContext();

function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/cart/');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartItemsContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartItemsContext.Provider>
  );
}

export default CartContext;
