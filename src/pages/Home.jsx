// import { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
// import productsData from '../data/products.json';
// import bgimage from '../Images/bgimage.jpeg'
// import Categorylistview from './Categorylistview';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInstance';
// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm.trim() !== '') {
//         axiosInstance
//           .get(`/product/?keyword=${searchTerm}`)
//           .then((res) => {
//             setProducts(res.data);
//           })
//           .catch((err) => {
//             console.error("API error:", err);
//           });
//       } else {
//         setProducts([]); // Clear when empty
//       }
//     }, 300); // debounce for 300ms

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm]);


//   const productView = () => {
//     navigate('/products/')  
//   };


//   return (
//     <div>
      
//        <div className="p-6" style={{
//          backgroundImage: `url(${bgimage})`,
//          backgroundSize: "cover",
//          backgroundRepeat: "no-repeat",
//          backgroundPosition: "center",
//          minHeight:"100vh"
//        }}>
//         <input
//           className="bg-amber-50 px-2 py-1 rounded mr-2"
//           type="text"
//           placeholder="Enter product name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//        />
//         <h1 className="text-2xl font-bold mb-6">Featured Products</h1> 
//         <button onClick={productView}>Explore more</button>  
//       </div>
//       <Categorylistview/>
//     </div>
//   );
// };

// export default Home;




import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import bgimage from '../Images/bgimage.jpeg';
import Categorylistview from './Categorylistview';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        axiosInstance
          .get(`/product/?keyword=${searchTerm}`)
          .then((res) => {
            if (res !=""){
            setProducts(res.data);
            }
          })
          .catch((err) => {
            console.error("API error:", err);
          });
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  console.log("ppp",products)

  const productView = () => {
    navigate('/products/');
  };

  const selectedProduct=(slectedId)=>{
    navigate(`/item/${slectedId}`)

  }

  return (
    <div>
      <div
        className="p-6"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <input
          className="bg-amber-50 px-2 py-1 rounded mr-2"
          type="text"
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


     {products.map((product)=>(
      <div key={product.id}
      onClick={()=>selectedProduct(product.id)}
      >
        <h1>{product.category.category_name} {product.product_name}</h1>
      </div>
     ))}

        <button
          onClick={productView}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Explore More
        </button>
      </div>

      <Categorylistview />
    </div>
  );
};

export default Home;
