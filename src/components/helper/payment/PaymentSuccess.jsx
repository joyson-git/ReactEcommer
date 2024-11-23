import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ baseURL }) => {
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  const saveOrder = async () => {
    try {
      await axios.post(`${baseURL}order/add/?token=${token}&sessionId=${sessionId}`);
      navigate("/order");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  useEffect(() => {
    // Fetch token and sessionId from localStorage
    const storedToken = localStorage.getItem("token");
    const storedSessionId = localStorage.getItem("sessionId");

    setToken(storedToken);
    setSessionId(storedSessionId);

    // Call saveOrder after state updates
    if (storedToken && storedSessionId) {
      saveOrder();
    }
  }, []);

  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default PaymentSuccess;
