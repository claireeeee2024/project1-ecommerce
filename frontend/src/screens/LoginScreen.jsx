import { useState } from "react";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <FormContainer>
      <div className="card-body mt-4">
        <h4 className="text-bg-light text-center mb-4">
          Sign in to your account
        </h4>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <div className="row my-4 ">
            <small className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center mb-2 mb-md-0">
              Don't have an account?{" "}
              <a href="/register" className="ms-1">
                Sign up
              </a>
            </small>
            <small className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
              <a href="/update-password" className="ms-1">
                Forgot password?
              </a>
            </small>
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
