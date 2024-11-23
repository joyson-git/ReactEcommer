import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderItems from "../../components/Order/OrderItems";

const OrderItemsView = ({ baseURL }) => {
  // Retrieve the `id` parameter from the URL
  const { id: orderID } = useParams();

  // State variables
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <OrderItems orderID={orderID} baseURL={baseURL} />
    </div>
  );
};

export default OrderItemsView;
