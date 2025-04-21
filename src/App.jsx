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
import ProductView from './Admin/ProductView';
import ProductContext from './context/ProductContext';
import ProductAdd from './Admin/ProductAdd';
import ProductUpdate from './Admin/ProductUpdate';
import ProductDelete from './Admin/ProductDelete';
import UserListView from './Admin/UserListView';
import OrderListView from './Admin/OrderListView';
import AdminHome from './Admin/AdminHome';


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryContext>
        <CartContext>
          <ProductContext>
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
            {/* <Route path='/admin/product_view/' element={<ProductView/>}/>
            <Route path='/admin/product_add/' element={<ProductAdd/>}/>
            <Route path='/admin/product_update/:updateId' element={<ProductUpdate/>}/>
            <Route path='/admin/product_delete/' element={<ProductDelete/>}/>
            <Route path='/admin/user_view/' element={<UserListView/>}/>
            <Route path='/admin/order_details/' element={<OrderListView/>}/> */}
            <Route path='/admin/*' element={<AdminHome />} />

            

          </Routes>
        </main>
        <Footer />   
      </BrowserRouter>
      </ProductContext>
      </CartContext>
      </CategoryContext>
    </div>
  );
}

export default App;
