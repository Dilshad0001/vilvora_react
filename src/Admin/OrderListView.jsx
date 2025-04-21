// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../axiosInstance'

// function OrderListView() {
//     const [orderDetail,setOrderDetail]=useState([])

//   useEffect(()=>{
//     const fetchProductdetails=async()=>{
//         try{
//             const res=await axiosInstance.get('/adminorder/')            
//             setOrderDetail(res.data)
//         }catch(error){
//             console.error("fetch error",error);   
//         }
//     }
//     fetchProductdetails()

//   },[])

//   console.log("details-",orderDetail);
  


//   return (
//     <div>
//       <h1>see order detalss</h1>
//       {orderDetail.map((order,index)=>(
//         <div key={index}>
//           <h1>{order.id}</h1>
//           <h1>deliver address= {order.delivery_address}</h1>
//           <h1>payment status= {order.payment_status}</h1>
//           <h1>toata Amount= {order.total_amount}</h1>
//           <h1>user= {order.user.username}</h1>
//           <h1>delivery status: {order.status}</h1>
//           <h1>date: {order.date}</h1>
//           <h1>products : </h1>
//           {order.carts.map((item)=>(
//             <div>
//               <h1>product item= {item.product.product_name}</h1>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default OrderListView

// =============================================================================

import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { use } from 'react'

function OrderListView() {
  const [orderDetail, setOrderDetail] = useState([])

  useEffect(() => {
    const fetchProductdetails = async () => {
      try {
        const res = await axiosInstance.get('/adminorder/')
        setOrderDetail(res.data)
      } catch (error) {
        console.error("fetch error", error);
      }
    }
    fetchProductdetails()
  }, [])



  const changePayment=async(id,payment_status)=>{
    console.log("clickedd",payment_status);
    
    if (payment_status==='Pending'){
      console.log("pee");
      
      try{
      const res=await axiosInstance.put('/adminorder/',{
        order_id:id,
        payment_status:'Paid'
      })
      }catch(error){
        console.error("payment upadte error",error);
      }
      
    }else{
      console.log("no pe");
      
      return;
    }
  }

  const changeDelivery=async(id,status)=>{
    console.log("clickedd");
    
    if (status==='Pending'){
      console.log("pee");
      
      try{
      const res=await axiosInstance.put('/adminorder/',{
        order_id:id,
        status:'Completed',
        is_finished:true,   
        order_number:1
      })
      }catch(error){
        console.error("payment upadte error",error);
      }
      
    }else{
      console.log("no pe");
      
      return;
    }
  }
  // changeDelivery
  console.log("details-", orderDetail);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">See Order Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Payment Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Delivery Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderDetail.map((order, index) => (

              <tr key={index} className={` ${order.is_finished ? 'bg-amber-500': 'bg-amber-50'} `}>
                <td className="px-4 py-2 text-sm text-gray-800">{order.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{order.user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{order.delivery_address}</td>
                <td onClick={()=>changePayment(order.id,order.payment_status)} className="hover:bg-amber-600 px-4 py-2 text-sm text-gray-800">{order.payment_status}</td>
                <td className="px-4 py-2 text-sm text-gray-800">₹ {order.total_amount}</td>
                <td onClick={()=>changeDelivery(order.id,order.status)} className="hover:bg-amber-600 px-4 py-2 text-sm text-gray-800">{order.status}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{order.date}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <ul className="list-disc pl-4">
                    {order.carts.map((item, i) => (
                      <li key={i}>{item.product.product_name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderListView
