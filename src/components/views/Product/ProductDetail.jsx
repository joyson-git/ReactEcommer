import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ProductDetail = ({ baseURL, products, categories }) => {
  const { id } = useParams();
  const history = useHistory();
  
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [wishlistString, setWishlistString] = useState("Add to wishlist");
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct) {
      const foundCategory = categories.find(
        (category) => category.id === foundProduct.categoryId
      );
      setCategory(foundCategory);
    }
  }, [id, products, categories]);

  const addToWishList = (productId) => {
    axios
      .post(`${baseURL}wishlist/add?token=${token}`, { id: productId })
      .then((response) => {
        if (response.status === 201) {
          setIsAddedToWishlist(true);
          setWishlistString("Added to WishList");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addToCart = (productId) => {
    axios
      .post(`${baseURL}cart/add?token=${token}`, { productId, quantity })
      .then((response) => {
        if (response.status === 201) {
          swal({
            text: "Product Added to the cart!",
            icon: "success",
            closeOnClickOutside: false,
          });
          // Refresh data in parent component (if needed)
          // You can trigger an event or a state update here.
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const listCartItems = () => {
    axios
      .get(`${baseURL}cart/?token=${token}`)
      .then((response) => {
        if (response.status === 200) {
          history.push("/cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-md-1"></div>
        <div className="col-md-4 col-12">
          <img
            src={product.imageURL}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 col-12 pt-3 pt-md-0">
          <h4>{product.name}</h4>
          <h6 className="category font-italic">{category?.categoryName}</h6>
          <h6 className="font-weight-bold">${product.price}</h6>
          <p>{product.description}</p>

          <div className="d-flex flex-row justify-content-between">
            <div className="input-group col-md-3 col-4 p-0">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Quantity
                </span>
              </div>
              <input
                className="form-control"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="input-group col-md-3 col-4 p-0">
              <button
                type="button"
                id="add-to-cart-button"
                className="btn"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
                <ion-icon name="cart-outline" />
              </button>
            </div>
          </div>

          <div className="features pt-3">
            <h5>
              <strong>Features</strong>
            </h5>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>
                Officia quas, officiis eius magni error magnam voluptatem
              </li>
              <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
              <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
              <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
            </ul>
          </div>

          <button
            id="wishlist-button"
            className="btn mr-3 p-1 py-0"
            style={{
              backgroundColor: isAddedToWishlist ? "#febd69" : "#b9b9b9",
            }}
            onClick={() => addToWishList(product.id)}
          >
            {wishlistString}
          </button>
          <button
            id="show-cart-button"
            type="button"
            className="btn mr-3 p-1 py-0"
            onClick={listCartItems}
          >
            Show Cart
            <ion-icon name="cart-outline" />
          </button>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
