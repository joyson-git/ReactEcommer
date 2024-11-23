import { useState, useEffect } from "react";
import axios from "axios";
import ProductBox from "../../components/Product/ProductBox"; // Ensure this component is created

const Wishlist = ({ baseURL }) => {
  const [products, setProducts] = useState(null);
  const [token, setToken] = useState(null);

  // Function to fetch the wishlist products
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${baseURL}wishlist/${token}`);
      setProducts(response.data); // Set the fetched products to state
    } catch (err) {
      console.log("Error fetching wishlist:", err);
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage); // Get the token from localStorage

    if (tokenFromStorage) {
      fetchWishlist(); // Fetch the wishlist if token exists
    }
  }, [baseURL]); // Effect will run when baseURL changes

  // If products are not yet fetched, show loading message
  if (products === null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h4 className="pt-3">Your WishList</h4>
            <p>Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Your WishList</h4>
        </div>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
            >
              <ProductBox product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products in your wishlist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
