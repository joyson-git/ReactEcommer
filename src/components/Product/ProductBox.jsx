
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ProductBox.css";

const ProductBox = ({ product }) => {
  const location = useLocation(); // To get the current route
  const navigate = useNavigate(); // For programmatic navigation

  const showDetails = () => {
    navigate(`/show-details/${product.id}`);
  };

  return (
    <div className="card h-100 w-100">
      <div className="embed-responsive embed-responsive-16by9">
        <img
          className="card-img-top embed-responsive-item"
          src={product.imageURL}
          alt="Product"
        />
      </div>
      <div className="card-body">
        <Link to={`/show-details/${product.id}`}>
          <h5 className="card-title">{product.name}</h5>
        </Link>
        <p className="card-text">
          <sup>$</sup>
          {product.price}
        </p>
        <p className="card-text font-italic">
          {product.description.substring(0, 65)}...
        </p>
        {location.pathname === "/admin-product" && (
          <Link
            id="edit-product"
            to={`/edit-product/${product.id}`}
            className="btn btn-link"
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductBox;
