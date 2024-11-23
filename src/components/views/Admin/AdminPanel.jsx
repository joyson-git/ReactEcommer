import  { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Optional: If you're using React Bootstrap for styling

const AdminPanel = () => {
  const history = useHistory();

  useEffect(() => {
    // Check for token in localStorage when component is mounted
    if (!localStorage.getItem('token')) {
      history.push('/signin');
    }
  }, [history]);

  return (
    <div className="adminPanel container">
      <div className="btn-container">
        <Button
          variant="primary"
          size="lg"
          onClick={() => history.push('/admin/product')}
        >
          Admin Products
        </Button>
      </div>

      <div className="btn-container">
        <Button
          variant="primary"
          size="lg"
          onClick={() => history.push('/admin/category')}
        >
          Admin Categories
        </Button>
      </div>

      <div className="btn-container">
        <Button
          variant="primary"
          size="lg"
          onClick={() => history.push('/admin/gallery')}
        >
          Admin Gallery
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
