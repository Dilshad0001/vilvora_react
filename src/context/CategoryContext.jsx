
import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

export const ItemsContext = createContext();

function CategoryContext({ children }) {
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/category/');
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ItemsContext.Provider value={{ Category }}>
      {children}
    </ItemsContext.Provider>
  );
}

export default CategoryContext;
