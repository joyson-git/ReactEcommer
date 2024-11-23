import  { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const AddProduct = ({ baseURL, categories, fetchData }) => {
  // State variables to store form data
  const [id, setId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState(null);

  const history = useHistory();

  useEffect(() => {
    // Redirect to signin if no token is found
    if (!localStorage.getItem("token")) {
      history.push("/signin");
    }
  }, [history]);

  const addProduct = async () => {
    const newProduct = {
      id,
      categoryId,
      name,
      description,
      imageURL,
      price,
    };

    try {
      const response = await axios.post(`${baseURL}product/add`, newProduct, {
        headers: { "Content-Type": "application/json" },
      });
      
      // Trigger parent component to fetch updated data
      fetchData();

      swal({
        text: "Product Added Successfully!",
        icon: "success",
        closeOnClickOutside: false,
      });

      history.push("/admin/product");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Add New Product</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6 px-5 px-md-0">
          <form>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>ImageURL</label>
              <input
                type="url"
                className="form-control"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addProduct}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AddProduct;
