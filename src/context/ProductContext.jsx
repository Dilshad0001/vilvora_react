


import React, { Children, createContext, useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
export const productContext=createContext();

function ProductContext({children}) {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        console.log("ggg");
        
        const getProduct=async()=>{
            try{
                const res=await axiosInstance.get('/adminproduct/product_view/')
                setProducts(res.data)
            }catch(error){
                console.error("fetching error",error);
                
            }
        };
        getProduct();
    },[])
    
  return (
    
        <productContext.Provider value={products}>
            {children}
            
        </productContext.Provider>
      
    
  )
}

export default ProductContext
