import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import Message from "./Message";
import { Button } from "react-bootstrap";
import { setSearchKeyword, setPage } from "../slices/productSlice";
import { Form } from "react-bootstrap";
import { setCartItems } from "../slices/cartApiSlice";
import React from "react";
import { useState, useEffect } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useGetCartsQuery } from "../slices/cartApiSlice";
import { useMemo } from "react";
import Cart from "./Cart";
import { toast } from "react-toastify";
import "./Header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchInput, setSearchInput] = useState(
    useSelector((state) => state.product.searchKeyword) || ""
  );
  const userId = useSelector((state) => state.auth.userInfo?._id) || null;
  const { data, error, isLoading } = useGetCartsQuery(
    {
      id: userId,
    },
    { skip: !userId }
  );

  const qtys = useSelector((state) => state.cart.qtys) || 0;
  const total = useSelector((state) => state.cart.total) || 0;

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
    if (!userInfo) {
      window.alert("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    setCartVisible(true);
  };
  const handleClose = () => {
    setCartVisible(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    dispatch(setSearchKeyword(searchInput));
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Management <span className="chuwa">Chuwa</span>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <Form
              onSubmit={handleSearch}
              className="d-flex mx-auto my-lg-0 my-2 flex-grow-1"
            >
              <Form.Control
                type="text"
                placeholder="Search"
                className="form-control me-2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-light">
                <FaSearch />
              </button>
            </Form>
            <ul className="navbar-nav ms-auto">
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
              <li className="nav-item">
                <button
                  className="nav-link active btn btn-link cart-button"
                  onClick={handleClick}
                >
                  <PiShoppingCart style={{ color: "white" }} />
                  {userInfo && qtys > 0 && (
                    <span className="badge badge-custom">{qtys}</span>
                  )}
                  {userInfo ? (
                    <span>${total > 0 ? total.toFixed(2) : "0.00"}</span>
                  ) : (
                    <span> $0.00</span>
                  )}
                </button>
                {cartVisible && <Cart onClose={handleClose} />}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    // <header>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //     <div className="container">
    //       <Link className="navbar-brand" to="/">
    //         Management <small>chuwa</small>
    //       </Link>
    //       <Form onSubmit={handleSearch} className="d-flex mx-auto my-lg-0 my-2">
    //         <Form.Control
    //           type="text"
    //           placeholder="Search products"
    //           className="form-control me-2 flex-grow-1"
    //           value={searchInput}
    //           onChange={(e) => setSearchInput(e.target.value)}
    //         />
    //         <button type="submit" className="btn btn-outline-light">
    //           <FaSearch />
    //         </button>
    //       </Form>
    //       {/* <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button> */}
    //       <div
    //         className="collapse navbar-collapse justify-content-end"
    //         id="navbarNav"
    //       >
    //         <ul className="navbar-nav">
    //           {userInfo ? (
    //             <li className="nav-item">
    //               <button
    //                 className="nav-link active btn btn-link"
    //                 onClick={logoutHandler}
    //               >
    //                 <i className="bi bi-person"></i> Sign Out
    //               </button>
    //             </li>
    //           ) : (
    //             <li className="nav-item">
    //               <Link className="nav-link active" to="/login">
    //                 <i className="bi bi-person"></i> Sign In
    //               </Link>
    //             </li>
    //           )}
    //           <li className="nav-item">
    //             <button
    //               className="nav-link active btn btn-link"
    //               onClick={handleClick}
    //             >
    //               <PiShoppingCart style={{ color: "white" }} />
    //               <span className="badge">{qtys || 0}</span>
    //               <span>${total.toFixed(2) || 0}</span>
    //             </button>
    //             {cartVisible && <Cart onClose={handleClose} />}
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   {logoutMessage && (
    //     <Message
    //       type={logoutMessage.type}
    //       onClose={() => setLogoutMessage(null)}
    //     >
    //       {logoutMessage.text}
    //     </Message>
    //   )}
    // </header>
  );
};

export default Header;
