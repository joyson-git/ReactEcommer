import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Checkout = ({ baseURL }) => {
  const stripeAPIToken = process.env.REACT_APP_STRIPETOKEN; // Stripe Token from environment
  const [stripe, setStripe] = useState(null);
  const [token, setToken] = useState(null);
  const [checkoutBodyArray, setCheckoutBodyArray] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Extracting route parameters

  // Dynamically include Stripe.js
  const includeStripe = (url, callback) => {
    const script = document.createElement('script');
    script.src = `//${url}`;
    script.onload = () => callback?.(null);
    document.body.appendChild(script);
  };

  // Configure Stripe
  const configureStripe = () => {
    const stripeInstance = window.Stripe(stripeAPIToken);
    setStripe(stripeInstance);
  };

  // Fetch all cart items
  const getAllItems = () => {
    axios
      .get(`${baseURL}cart/?token=${token}`)
      .then((response) => {
        if (response.status === 200) {
          const products = response.data.cartItems;
          const items = products.map((item) => ({
            imageUrl: item.product.imageURL,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            productId: item.product.id,
            userId: item.userId,
          }));
          setCheckoutBodyArray(items);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle checkout process
  const goToCheckout = () => {
    axios
      .post(`${baseURL}order/create-checkout-session`, checkoutBodyArray)
      .then((response) => {
        localStorage.setItem('sessionId', response.data.sessionId);
        return stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      })
      .catch((err) => {
        console.error('Error during checkout:', err);
      });
  };

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);

    if (!id) {
      navigate('/'); // Redirect to Home if `id` is undefined
      return;
    }

    // Dynamically include Stripe and configure it
    includeStripe('js.stripe.com/v3/', configureStripe);

    // Fetch all cart items
    getAllItems();
  }, [id, navigate]); // Dependencies

  return (
    <div className="div_class">
      <h3>You will be redirected to the payment page</h3>
      <div className="alert alert-primary" role="alert">
        While making payment, use card number **4242 4242 4242 4242** and enter random CVV (3 digits).
      </div>
      <button
        className="checkout_button"
        id="proceed-to-checkout"
        onClick={goToCheckout}
        disabled={!stripe}
      >
        Make Payment
      </button>
    </div>
  );
};

export default Checkout;
