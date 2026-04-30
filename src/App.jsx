import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from './pages/ProductDetails';
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess.jsx";


function Layout(){
  return(
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
    {path: "/", element: <Home/>},
    {path: "/Login", element: <Login/>},
    {path: "/Signup", element: <Signup/>},
    {path: "/Product/:id", element: <ProductDetails/>},
    { path : "/cart", element: <Cart />},

    { path: "/admin/products", element: <ProductList /> },
    { path: "/admin/products/add", element: <AddProduct /> },
    { path: "/admin/products/edit/:id", element: <EditProduct /> },
    { path: "/checkout-address", element: <CheckoutAddress /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  }, 
]);

export default function App(){
  return <RouterProvider router={router}/>;
}
