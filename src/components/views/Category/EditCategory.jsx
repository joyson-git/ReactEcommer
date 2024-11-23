import  { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCategory = ({ baseURL, categories }) => {
  const { id } = useParams(); // Getting category ID from route params
  const history = useHistory();
  
  // State variables for the form fields
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Find the category from the categories prop based on the ID
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/signin');
      return;
    }

    const category = categories.find(category => category.id === parseInt(id));
    if (category) {
      setCategoryName(category.categoryName);
      setDescription(category.description);
      setImageUrl(category.imageUrl);
    }
  }, [id, categories, history]);

  const editCategory = async () => {
    const updatedCategory = {
      id: parseInt(id),
      categoryName,
      description,
      imageUrl,
      products: null, // Assuming we don't need products in the update request
    };

    try {
      await axios.post(`${baseURL}category/update/${id}`, updatedCategory, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Navigate to Admin Category page after success
      history.push('/admin-category');
      
      // Show success alert (can use a package like swal or use a custom modal)
      alert("Category Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Edit Category</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6 px-5 px-md-0">
          <form>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={editCategory}>
              Submit
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default EditCategory;
