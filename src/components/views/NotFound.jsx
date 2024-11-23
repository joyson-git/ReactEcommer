import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found container">
      <h2>404</h2>
      <h3>Page Not Found</h3>
      <h5>
        No worries, get back to{' '}
        <Link to="/">Home</Link>
      </h5>
    </div>
  );
};

export default NotFound;
