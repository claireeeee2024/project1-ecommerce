import { Link } from "react-router-dom";

const UnauthorizedScreen = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold" style={{ fontSize: "100px" }}>
        403
      </h1>
      <p className="h3">Unauthorized Access</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Home
      </Link>
    </div>
  );
};

export default UnauthorizedScreen;
