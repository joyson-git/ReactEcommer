import  { useState, useEffect } from "react";
import axios from "axios";
import "./OrderItems.css"; // Import your scoped styles

const OrderItems = ({ orderID, baseURL }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getTheProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}order/${orderID}?token=${token}`);
        if (response.status === 200) {
          const productsData = response.data;
          const formattedProducts = productsData.orderItems.map((item) => ({
            imgUrl: item.product.imageURL,
            pName: item.product.name,
            pDescription: item.product.description,
            pPrice: item.product.price,
            pQuantity: item.quantity,
          }));
          setOrderProducts(formattedProducts);
          setTotalCost(productsData.totalPrice);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getTheProducts();
  }, [orderID, baseURL, token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Order Id: - {orderID}</h4>
        </div>
      </div>

      {orderProducts.map((product, index) => (
        <div key={index} className="row mt-2 pt-3 justify-content-around">
          <div className="col-1"></div>
          <div className="col-md-3 embed-responsive embed-responsive-16by9">
            <img
              src={product.imgUrl}
              className="w-100 card-img-top embed-responsive-item"
              alt={product.pName}
            />
          </div>
          <div className="col-md-5 px-3">
            <div className="card-block px-3">
              <h6 className="card-title">{product.pName}</h6>
              <p id="item-price" className="mb-0 font-weight-bold">
                <sup>$</sup>
                {product.pPrice} per unit
              </p>
              <p id="item-quantity" className="mb-0">
                Quantity : {product.pQuantity}
              </p>
              <p id="item-total-price" className="mb-0">
                Total Price :{" "}
                <sup>$</sup>
                <span className="font-weight-bold">
                  {product.pPrice * product.pQuantity}
                </span>
              </p>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      ))}

      <div className="total-cost pt-2 text-right">
        <h5>Total Cost : $ {totalCost}</h5>
      </div>
    </div>
  );
};

export default OrderItems;
