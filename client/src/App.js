
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/User/Login/login';
import Signup from './components/User/Signup/Signup';
import OTPVerification from './components/User/Verification/OTPVerification';
import EnterEmail from './components/User/Verification/EnterEmail'; import ProductList from './components/User/products/product';
import { PrivateRoutes, AdminPrivateRoutes } from './components/protectedRoutes/PrivateRoutes'
import ProductView from './components/User/products/ProductView';
import Wishlist from './components/User/Wishlist/Wishlist';
import Cart from './components/User/AddCart/Cart';
import ResetPassword from './components/User/Login/Resetpassword';
import ChangePassword from './components/User/Login/ChangePassword';
import UserProfile from './components/User/UserProfile/UserProfile'
import Sidebar from './components/Admin/Sidebar/Sidebar';
import Users from './components/Admin/Users/Users';
import AddProduct from './components/Admin/ProductPage/AddProduct'
import ViewProducts from './components/Admin/ProductPage/ViewProducts'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import OrdersPage from './components/Admin/Orders/Orders'
import ShippingForm from './components/User/Orderdata/ShippingForm/ShippingFrom';
import UserOrderPage from './components/User/Orderdata/myOrder/Myorder';
import AboutContactPage from './components/Header/AboutContactPage';
import NotFound from './components/NotFound';
import EditProduct from './components/Admin/ProductPage/EditProduct';
import OrderInvoice from './components/User/Orderdata/Invoice/Invoice';



function App() {
  return (
    <div >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/verifyOTP' element={<OTPVerification />} />
        <Route path='/emailEnter' element={<EnterEmail />} />

        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/about' element={<AboutContactPage />} />
        <Route path='/editproduct/:ProductId' element={<EditProduct />} />





        <Route element={<AdminPrivateRoutes />}>

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/ViewProducts' element={<ViewProducts />} />
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/Users' element={<Users />} />
          <Route path='/orders' element={<OrdersPage />} />
        </Route>







        <Route element={<PrivateRoutes />}>
          <Route path='/productlist' element={<ProductList />} />
          <Route path='/productview/:_id' element={<ProductView />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/editprofile' element={<UserProfile />} />
          <Route path='/checkout' element={<ShippingForm />} />
          <Route path='/myorders' element={<UserOrderPage />} />
          <Route path='/order-invoice' element={<OrderInvoice/>}/>
        </Route>





        <Route path='*' element={<NotFound />} />



      </Routes>


    </div>
  );
}

export default App;
