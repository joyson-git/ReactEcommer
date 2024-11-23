import  { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryBox from '../../components/Category/CategoryBox';

const Category = ({ baseURL, categories }) => {
  const history = useHistory();

  // Redirect to Signin if there's no token and on AdminCategory route
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname === '/admin-category') {
      history.push('/signin');
    }
  }, [history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Our Categories</h4>
          {/* Conditionally render the "Add a new Category" button */}
          {window.location.pathname === '/admin-category' && (
            <button className="btn" onClick={() => history.push('/add-category')}>Add a new Category</button>
          )}
        </div>
      </div>
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
            <CategoryBox category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
