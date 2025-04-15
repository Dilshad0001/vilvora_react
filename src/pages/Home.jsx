import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import bgimage from '../Images/bgimage.jpeg'
import Categorylistview from './Categorylistview';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);
  const navigate=useNavigate()


  const productView = () => {
    navigate('/products/')  
  };


  return (
    <div>
      
       <div className="p-6" style={{
         backgroundImage: `url(${bgimage})`,
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
         minHeight:"100vh"
       }}>
        <input
          className="bg-amber-50 px-2 py-1 rounded mr-2"
          type="text"
          placeholder="Enter product name"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1> 
        <button onClick={productView}>Explore more</button>  
      </div>
      <Categorylistview/>
    </div>
  );
};

export default Home;
