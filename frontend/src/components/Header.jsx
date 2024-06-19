import { setCartItems } from "../slices/cartSlice";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cart from "./Cart";

const Header = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const dispatch = useDispatch();
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
      <div className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container ">
          <div className="navbar-brand" href="/">
            Product Management System
          </div>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav mr-auto">
              <div className="nav-item">
                <a className="nav-link active" href="/login">
                  <i className="bi bi-person"></i> Sign In
                </a>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
/**
 * <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Product Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <FaUser /> Sign In
              </Nav.Link>
              <Nav.Link href="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
 */

export default Header;
