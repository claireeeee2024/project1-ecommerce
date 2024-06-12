const Header = () => {
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
                <a className="nav-link active" href="/">
                  <i className="bi bi-cart3"></i> $0.0
                </a>
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
