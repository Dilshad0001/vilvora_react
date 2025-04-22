

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import ProductView from './Admin/ProductView';
import ProductContext from './context/ProductContext';
import ProductAdd from './Admin/ProductAdd';
import ProductUpdate from './Admin/ProductUpdate';
import ProductDelete from './Admin/ProductDelete';
import UserListView from './Admin/UserListView';
import OrderListView from './Admin/OrderListView';
import AdminHome from './Admin/AdminHome';
import Categorylistview from './pages/Categorylistview';
import toast, { Toaster } from 'react-hot-toast'; 
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryContext>
        <CartContext>
          <ProductContext>
            <BrowserRouter>
              <AppWithRouter />
            </BrowserRouter>
          </ProductContext>
        </CartContext>
      </CategoryContext>
    </div>
  );
}

function AppWithRouter() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow bg-gradient-to-br from-[#eeecec] via-[#fffafa] to-[#f1dcde]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/card" element={<ProductCard />} />
          <Route path="/item/:id" element={<ProductItem />} />
          <Route path="/buy" element={<Payment />} />
          <Route path="/p" element={<Pay />} />
          <Route path="/c" element={<Categorylistview />} />
          <Route path="/ad" element={<AdminLogin />} />

          <Route path="/admin/*" element={<AdminHome />} />
        </Routes>
        <Toaster position="top-right" />
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
