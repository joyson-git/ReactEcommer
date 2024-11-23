import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom"; // Keep your existing imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [baseURL] = useState("https://limitless-lake-55070.herokuapp.com/");
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(null);

  const location = useLocation(); // This will now work as it's inside Router

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await axios.get(`${baseURL}product/`);
      setProducts(productsRes.data);

      // Fetch categories
      const categoriesRes = await axios.get(`${baseURL}category/`);
      setCategories(categoriesRes.data);

      // Fetch cart items
      if (token) {
        const cartRes = await axios.get(`${baseURL}cart/?token=${token}`);
        if (cartRes.status === 200) {
          setCartCount(Object.keys(cartRes.data.cartItems).length);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showNavbarFooter = !['/signup', '/signin'].includes(location.pathname.toLowerCase());

  return (
    <div>
      {showNavbarFooter && <Navbar cartCount={cartCount} />}
      
      <div style={{ minHeight: "60vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <SomeComponent
                baseURL={baseURL}
                products={products}
                categories={categories}
                fetchData={fetchData}
              />
            }
          />
          {/* Other routes can be added here */}
        </Routes>
      </div>

      {showNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
