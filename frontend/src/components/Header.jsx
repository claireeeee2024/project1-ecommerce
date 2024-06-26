import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import Message from "./Message";

import { setCartItems } from "../slices/cartSlice";
import React from "react";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cartVisible, setCartVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (err) {
      toast.success("Logout failed. Please try again.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } });
  };

  const handleClick = () => {
    setCartVisible(true);
  };
  const handleClose = () => {
    setCartVisible(false);
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Product Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {userInfo ? (
                <li className="nav-item">
                  <button
                    className="nav-link active btn btn-link"
                    onClick={logoutHandler}
                  >
                    <i className="bi bi-person"></i> Sign Out
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link active btn btn-link"
                    onClick={handleLoginClick}
                  >
                    <i className="bi bi-person"></i> Sign In
                  </button>
                </li>
              )}
              <div className="nav-item">
                {/* <li className="nav-item" onClick={handleClick}>
                  <i className="bi bi-cart3"></i> $0.0
                  {cartVisible && <Cart onClose={handleClose} />}
                </li> */}
                <button onClick={handleClick}>
                  <i className="bi bi-cart3"></i>{" "}
                  <span className="position-absolute top-10 start-10 translate-middle badge border border-light rounded-circle bg-danger p-2">
                    <span className="visually-hidden"></span>
                  </span>{" "}
                  $0.0
                </button>
                {cartVisible && <Cart onClose={handleClose} />}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
