import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailedPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove session ID from localStorage and redirect
    localStorage.removeItem("sessionId");
    navigate("/order");
  }, [navigate]);

  return (
    <div className="text-center">
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default FailedPayment;
