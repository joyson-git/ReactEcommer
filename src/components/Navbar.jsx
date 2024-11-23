import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = ({ cartCount }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    Swal.fire({
      text: "Logged you out. Visit Again",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img id="logo" src="/assets/icon.png" alt="Logo" />
      </Link>

      {/* Burger Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* Search Bar */}
        <form className="form-inline ml-auto mr-auto">
          <div className="input-group">
            <input
              size="100"
              type="text"
              className="form-control"
              placeholder="Search Items"
              aria-label="Search"
            />
            <button className="btn btn-warning input-group-prepend">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        {/* Dropdowns */}
        <ul className="navbar-nav ml-auto">
          {/* Browse Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link text-light dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Browse
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/products">
                  Product
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/categories">
                  Category
                </Link>
              </li>
            </ul>
          </li>

          {/* Account Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link text-light dropdown-toggle"
              href="#"
              id="accountDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Accounts
            </a>
            <ul className="dropdown-menu" aria-labelledby="accountDropdown">
              {token ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/wishlist">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      Admin
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleSignOut}>
                      Sign Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/signin">
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>

          {/* Orders */}
          <li className="nav-item">
            <Link className="nav-link text-light" to="/orders">
              Orders
            </Link>
          </li>

          {/* Cart */}
          <li className="nav-item" id="cart">
            <span id="nav-cart-count">{cartCount}</span>
            <Link className="text-light" to="/cart">
              <i className="fa fa-shopping-cart" style={{ fontSize: "36px" }}></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
