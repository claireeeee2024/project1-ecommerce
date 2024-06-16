import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

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
              <li className="nav-item">
                <Link className="nav-link active" to="/cart">
                  <i className="bi bi-cart3"></i> $0.0
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
