import { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import bgimage from '../Images/bgimage.jpeg';
import Categorylistview from './Categorylistview';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        axiosInstance
          .get(`/product/?keyword=${searchTerm}`)
          .then((res) => {
            if (res != "") {
              setProducts(res.data);
              setShowResults(true);
            }
          })
          .catch((err) => {
            console.error("API error:", err);
          });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setProducts([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const productView = () => {
    navigate('/products/');
  };

  const selectedProduct = (slectedId) => {
    navigate(`/item/${slectedId}`);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1b1b] via-[#2b1d1e] to-[#3c2c2e] ">
      <div
        className="relative py-12 md:py-20 lg:py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">Discover Amazing Products</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-6 md:mb-8">Find exactly what you're looking for</p>

            {/* Search Bar */}
            <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                <input
                  className="w-full px-4 py-3 focus:outline-none"
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && setShowResults(true)}
                />
                <button className="bg-blue-600 text-white px-4 py-3 flex-shrink-0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {showResults && products.length > 0 && (
                <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div 
                      key={product.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectedProduct(product.id)}
                    >
                      <div className="flex items-center p-3">
                        {product.image && (
                          <div className="w-12 h-12 mr-3 flex-shrink-0">
                            <img src={product.image} alt={product.product_name} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.product_name}</p>
                          <p className="text-xs text-gray-600">{product.category.category_name}</p>
                          {product.price && (
                            <p className="text-sm font-bold text-gray-900 mt-1">${product.price}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 🌟 Updated Button */}
            <button
              onClick={productView}
              className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Explore All Products
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center">Shop by Category</h2>
          <Categorylistview />
        </div>
      </div>
    </div>
  );
};

export default Home;
