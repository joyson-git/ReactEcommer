import  { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const AddImage = ({ baseURL }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = async () => {
    if (!selectedFile) {
      swal({
        text: 'Select a file first',
        icon: 'warning',
        closeOnClickOutside: false,
      });
      return;
    }

    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png' && selectedFile.type !== 'image/jpg') {
      swal({
        text: 'Select an image/jpeg file!',
        icon: 'error',
        closeOnClickOutside: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${baseURL}fileUpload/`, formData);
      swal({
        text: 'Image Added Successfully!',
        icon: 'success',
        closeOnClickOutside: false,
      });
      history.push('/admin/gallery'); // Redirect to gallery page
    } catch (err) {
      console.error(err);
      swal({
        text: 'Error uploading the image!',
        icon: 'error',
        closeOnClickOutside: false,
      });
    }
  };

  // Redirect to sign-in page if no token is present
  if (!localStorage.getItem('token')) {
    history.push('/signin');
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="pt-3">Add a new Image</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6 px-5 px-md-0 pt-5">
          <div className="form-group">
            <label htmlFor="myfile">Select image :</label>
            <input
              type="file"
              id="myfile"
              className="form-control-file"
              onChange={onFileSelected}
            />
          </div>
          <button type="button" className="btn btn-info" onClick={onUpload}>
            Upload
          </button>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AddImage;
