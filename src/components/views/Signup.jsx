import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Signup = ({ baseURL }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password === passwordConfirm) {
      setLoading(true);
      const user = {
        email,
        firstName,
        lastName,
        password,
      };

      try {
        const response = await axios.post(`${baseURL}user/signup`, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Redirect to home page
        swal({
          text: "User signup successful. Please Login",
          icon: "success",
          closeOnClickOutside: false,
        });
        history.replace("/");
      } catch (error) {
        console.error(error);
        swal({
          text: "Error during signup. Please try again.",
          icon: "error",
          closeOnClickOutside: false,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Password mismatch
      swal({
        text: "Error! Passwords do not match.",
        icon: "error",
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center pt-3">
          <a href="/home">
            <img id="logo" src="../assets/icon.png" alt="logo" />
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-center pt-5">
          <div id="signup-div" className="flex-item border">
            <h2 className="pt-4 pl-4">Create Account</h2>
            <form onSubmit={handleSignup} className="pt-4 pl-4 pr-4">
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
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
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
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2 py-0" disabled={loading}>
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <hr />
            <small className="form-text text-muted pt-2 pl-4 text-center">
              Already Have an Account?
            </small>
            <p className="text-center">
              <a
                href="/signin"
                className="btn btn-dark text-center mx-auto px-5 py-1 mb-2"
              >
                Signin Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
