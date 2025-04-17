import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from '../src/pages/Home';
import Navbar from '../src/components/Navbar';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductCard from './components/ProductCard';
import ProductItem from './pages/ProductItem';
import Buy from './pages/Buy';
import Payment from './pages/Payment';
import CategoryContext from './context/CategoryContext';
import CartContext from './context/CartContext';
import Pay from './pages/Pay';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryContext>
        <CartContext>
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/products' element={<Products/>}/>
            <Route path='/card' element={<ProductCard/>}/>
            <Route path='/item/:id' element={<ProductItem/>}/>
            <Route path='/buy/' element={<Payment/>}/>
            <Route path='/p/' element={<Pay/>}/>
          </Routes>
        </main>
        <Footer />        
      </BrowserRouter>
      </CartContext>
      </CategoryContext>
    </div>
  );
}

export default App;
