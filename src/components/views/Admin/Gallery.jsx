import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ImageBox from '../../components/ImageBox'; // Assuming you have ImageBox component in React
import { Button } from 'react-bootstrap'; // Optional: If you're using React Bootstrap

const Gallery = ({ baseURL }) => {
  const [images, setImages] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Check for token in localStorage when component mounts
    if (!localStorage.getItem('token')) {
      history.push('/signin');
      return;
    }

    // Fetch images
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${baseURL}fileUpload/`);
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [baseURL, history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Gallery</h4>
          <Button
            variant="primary"
            onClick={() => history.push('/admin/gallery/add')}
          >
            Add a new Image
          </Button>
        </div>
      </div>

      <div className="row">
        {images &&
          images.map((image) => (
            <div
              key={image.name}
              className="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
            >
              <ImageBox image={image} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
