import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const AddCategory = ({ baseURL, fetchData }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const history = useHistory();

  // Redirect if the token is not present
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/signin');
    }
  }, [history]);

  // Handle form submission
  const addCategory = async () => {
    const newCategory = {
      categoryName,
      description,
      imageUrl: imageURL,
    };

    try {
      const response = await axios.post(`${baseURL}category/create`, newCategory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        fetchData(); // Call parent method to fetch updated data
        history.push('/admin-category'); // Navigate to AdminCategory page
        swal({
          text: 'Category Added Successfully!',
          icon: 'success',
          closeOnClickOutside: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Add new Category</h4>
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
              <label>Image URL</label>
              <input
                type="url"
                className="form-control"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addCategory}
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

export default AddCategory;
