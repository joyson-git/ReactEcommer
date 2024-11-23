import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Cart = ({ baseURL }) => {
  const [carts, setCarts] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useHistory();

  // Fetch cart items when the component mounts
  useEffect(() => {
    listCartItems();
  }, []);

  // List cart items
  const listCartItems = async () => {
    try {
      const response = await axios.get(`${baseURL}cart/?token=${token}`);
      if (response.status === 200) {
        const data = response.data;
        setCarts(data);
        const items = data.cartItems.map((item) => ({
          imgUrl: item.product.imageURL,
          pName: item.product.name,
          pDescription: item.product.description,
          pPrice: item.product.price,
          pQuantity: item.quantity,
          id: item.id,
          pId: item.product.id,
          userId: item.userId
        }));
        setCartItems(items);
        setTotalCost(data.totalCost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle checkout
  const checkout = () => {
    history.push({ pathname: '/checkout', state: { id: cartItems.length } });
  };

  // Show product details
  const showDetails = (index) => {
    history.push({ pathname: `/product/${cartItems[index].pId}` });
  };

  // Delete an item from the cart
  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${baseURL}cart/delete/${itemId}/?token=${token}`);
      if (response.status === 200) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update item quantity
  const updateItem = async (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, pQuantity: quantity } : item
    );
    setCartItems(updatedCartItems);

    const itemToUpdate = updatedCartItems.find(item => item.id === itemId);
    const { userId, pId } = itemToUpdate;

    try {
      await axios.put(`${baseURL}cart/update/${itemId}/?token=${token}`, {
        id: itemId,
        userId,
        productId: pId,
        quantity
      });
      listCartItems(); // Re-fetch cart items to update the total cost
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the cart is empty
  const isDisabled = () => {
    return cartItems.length === 0;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Cart</h4>
        </div>
      </div>

      {cartItems.length > 0 && cartItems.map((item, index) => (
        <div key={index} className="row mt-2 pt-3 justify-content-around">
          <div className="col-2"></div>
          <div className="col-md-3 embed-responsive embed-responsive-16by9">
            <img src={item.imgUrl} alt={item.pName} className="w-100 card-img-top embed-responsive-item" />
          </div>
          <div className="col-md-5 px-3">
            <div className="card-block px-3">
              <h6 className="card-title" onClick={() => showDetails(index)}>{item.pName}</h6>
              <p id="item-price" className="mb-0 font-weight-bold">$ {item.pPrice} per unit</p>
              <p id="item-quantity" className="mb-0">
                Quantity :
                <input
                  type="number"
                  size="1"
                  className="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
                  value={item.pQuantity}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                />
              </p>
              <p id="item-total-price" className="mb-0">Total Price : $ <span className="font-weight-bold">{item.pPrice * item.pQuantity}</span></p>
              <br />
              <a href="#" className="text-right" onClick={() => deleteItem(item.id)}>Remove From Cart</a>
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-12"><hr /></div>
        </div>
      ))}

      <div className="total-cost pt-2 text-right">
        <h5>Total Cost : $ {totalCost}</h5>
        <button disabled={isDisabled()} className="btn btn-primary confirm" onClick={checkout}>Confirm Order</button>
      </div>
    </div>
  );
};

export default Cart;
