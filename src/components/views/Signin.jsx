import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Signin = ({ baseURL }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = { email, password };

    try {
      const response = await axios.post(`${baseURL}user/signIn`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('token', response.data.token);
      // You can pass the refreshNav function as a prop or useContext to refresh navigation
      // Example: props.refreshNav();
      history.push('/');
    } catch (err) {
      console.error(err);
      alert('Unable to log you in!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center pt-3">
          <Link to="/">
            <img id="logo" src="../assets/icon.png" alt="Logo" />
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signin-div" className="flex-item border">
            <h2 className="pt-4 pl-4">Sign-In</h2>
            <form onSubmit={signin} className="pt-4 pl-4 pr-4">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <small className="form-text text-muted">
                By continuing, you agree to Simplecoding's Conditions of Use and Privacy Notice.
              </small>
              <button type="submit" className="btn btn-primary mt-2 py-0">
                Continue
                {loading && (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            <hr />
            <small className="form-text text-muted pt-2 pl-4 text-center">New to Simplecoding?</small>
            <p className="text-center">
              <Link to="/signup" className="btn btn-dark text-center mx-auto px-5 py-1 mb-2">
                Create Your Simplecoding Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
