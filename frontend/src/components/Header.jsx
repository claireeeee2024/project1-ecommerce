import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { setSearchKeyword, setPage } from "../slices/productSlice";
import { Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { useGetTotalQuery } from "../slices/cartApiSlice";
import Cart from "./Cart";
import { toast } from "react-toastify";
import "./Header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchInput, setSearchInput] = useState(
    useSelector((state) => state.product.searchKeyword) || ""
  );

  const { data, isLoading, error } = useGetTotalQuery(
    {
      userId: userInfo?._id,
    },
    { skip: !userInfo }
  );

  console.log("total data:", data);

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
    navigate("/");
  };
  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">
                Management{" "}
                <span style={{ fontSize: "10px" }} className="chuwa">
                  Chuwa
                </span>
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
                      {userInfo && data.totalQuantity > 0 && (
                        <span className="badge badge-custom">
                          {data.totalQuantity}
                        </span>
                      )}
                      {userInfo ? (
                        <span>
                          $
                          {data.totalPrice > 0
                            ? data.totalPrice.toFixed(2)
                            : "0.00"}
                        </span>
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
      )}
    </>
  );
};

export default Header;
