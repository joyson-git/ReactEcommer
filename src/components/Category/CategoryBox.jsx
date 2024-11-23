
import { Link, useLocation } from "react-router-dom";

const CategoryBox = ({ category }) => {
  const location = useLocation(); // To determine the current route name

  return (
    <div className="card h-100 w-100">
      <div className="embed-responsive embed-responsive-16by9">
        <img
          className="card-img-top embed-responsive-item"
          src={category.imageUrl}
          alt="Category Image"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <Link to={`/list-products/${category.id}`}>
          <h5 className="card-title">{category.categoryName}</h5>
        </Link>
        <p className="card-text font-italic">
          {category.description.substring(0, 65)}...
        </p>
        {location.pathname === "/admin-category" && (
          <Link
            id="edit-category"
            to={`/edit-category/${category.id}`}
            style={{ float: "right" }}
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryBox;
