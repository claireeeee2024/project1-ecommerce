import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

import { setCartItems } from "../slices/cartSlice";
import React from "react";
import { useState } from "react";
import Cart from "./Cart";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const [cartVisible, setCartVisible] = useState(false);
  const handleClick = () => {
    //   const cartData = {
    //     items: [
    //       {
    //         id: 1,
    //         name: "Meta Quest2 VR",
    //         price: 299.0,
    //         quantity: 1,
    //         image: "url_to_image",
    //       },
    //       {
    //         id: 2,
    //         name: "iWatch",
    //         price: 100.0,
    //         quantity: 2,
    //         image: "url_to_image",
    //       },
    //     ],
    //     total: 499.0,
    //     tax: 49.9,
    //     discount: 20.0,
    //   };
    //   dispatch(setCartItems(cartData));
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
                  <Link className="nav-link active" to="/login">
                    <i className="bi bi-person"></i> Sign In
                  </Link>
                </li>
              )}
              <div className="nav-item">
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
