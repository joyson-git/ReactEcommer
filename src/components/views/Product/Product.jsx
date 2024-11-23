import  { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductBox from "../../components/Product/ProductBox";

const Products = ({ baseURL, products }) => {
  const history = useHistory();

  // Redirect to signin if the route is AdminProduct and no token is found
  useEffect(() => {
    if (window.location.pathname === "/admin/product" && !localStorage.getItem("token")) {
      history.push("/signin");
    }
  }, [history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Our Products</h4>
          {window.location.pathname === "/admin/product" && (
            <button className="btn" onClick={() => history.push("/admin/product/add")}>
              Add a new Product
            </button>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
            <ProductBox product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
