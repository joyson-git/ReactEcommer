
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import views
import Home from "../views/Home";
import Admin from "../views/Admin/Admin";
import Gallery from "../views/Admin/Gallery";
import AddImage from "../views/Admin/AddImage";

import PageNotFound from "../views/NotFound";

import Product from "../views/Product/Product";
import AddProduct from "../views/Product/AddProduct";
import EditProduct from "../views/Product/EditProduct";
import ShowDetails from "../views/Product/ProductDetail";
import Wishlist from "../views/Product/Wishlist";

import Cart from "../views/Cart/Cart";
import Checkout from "../views/Checkout/Checkout";
import Order from "../views/Orders/Order";

import Category from "../views/Category/Category";
import AddCategory from "../views/Category/AddCategory";
import EditCategory from "../views/Category/EditCategory";
import ListProducts from "../views/Category/ListProducts";

import Signup from "../views/Signup";
import Signin from "../views/Signin";

import Success from "../views/helper/payment/Success";
import Failed from "../views/helper/payment/Failed";

import OrderItemView from "../views/Orders/OrderItemView";

// Scroll to top helper component
import ScrollToTop from "../components/ScrollToTop";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/gallery" element={<Gallery />} />
        <Route path="/admin/gallery/add" element={<AddImage />} />

        {/* Product routes */}
        <Route path="/product" element={<Product />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/product/add" element={<AddProduct />} />
        <Route path="/admin/product/:id" element={<EditProduct />} />
        <Route path="/product/show/:id" element={<ShowDetails />} />

        {/* Category routes */}
        <Route path="/category" element={<Category />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/category/add" element={<AddCategory />} />
        <Route path="/admin/category/:id" element={<EditCategory />} />
        <Route path="/category/show/:id" element={<ListProducts />} />

        {/* Wishlist, Cart, and Checkout */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Orders */}
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderItemView />} />

        {/* Signup and Signin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Payment */}
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/failed" element={<Failed />} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
