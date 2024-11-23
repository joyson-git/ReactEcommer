import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = ({ baseURL }) => {
  const [token, setToken] = useState(null);
  const [orderList, setOrderList] = useState([]);

  // Fetch order history
  const listOrders = async () => {
    try {
      const response = await axios.get(`${baseURL}order/?token=${token}`);
      if (response.status === 200) {
        const orders = response.data;

        // Map API response to orderList structure
        const formattedOrders = orders.map((order) => ({
          id: order.id,
          totalCost: order.totalPrice,
          orderdate: order.createdDate.substring(0, 10), // Extract date in YYYY-MM-DD
          imageURL: order.orderItems[0]?.product?.imageURL || "", // Default empty if no image
          totalItems: order.orderItems.length,
        }));

        setOrderList(formattedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch token and orders on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      listOrders();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Your Orders</h4>
        </div>
      </div>

      {orderList.map((order) => (
        <div key={order.id} className="row mt-2 pt-3 justify-content-around">
          <div className="col-2"></div>
          <div className="col-md-3 embed-responsive embed-responsive-16by9">
            <img
              src={order.imageURL}
              alt={`Order ${order.id}`}
              className="w-100 card-img-top embed-responsive-item"
            />
          </div>
          <div className="col-md-5 px-3">
            <div className="card-block px-3">
              <h6 className="card-title">
                <Link to={`/order/${order.id}`}>Order No : {order.id}</Link>
              </h6>
              <p className="mb-0">
                {order.totalItems} item
                {order.totalItems > 1 ? "s" : ""}
              </p>
              <p id="item-price" className="mb-0 font-weight-bold">
                Total Cost : $ {order.totalCost}
              </p>
              <p id="item-total-price">Ordered on : {order.orderdate}</p>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-12">
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
