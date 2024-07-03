import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { validatePassword, validateEmail } from "../utils/validation";
export const EmailField = ({ email, setEmail, errors, setErrors }) => {
  const handleChange = (e) => {
    setErrors({ ...errors, email: validateEmail(e.target.value) });
    setEmail(e.target.value);
  };

  return (
    <Form.Group controlId="email" className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleChange}
        isInvalid={!!errors.email}
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const PasswordField = ({ password, setPassword, errors, setErrors }) => {
  const handleChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  return (
    <Form.Group controlId="password" className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handleChange}
        isInvalid={!!errors.password}
      />
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const AuthForm = ({
  mode,
  title,
  email,
  setEmail,
  password,
  setPassword,
  isVendor,
  setIsVendor,
  onSubmit,
  errors,
  setErrors,
}) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Container>
      <Row className="py-lg-3">
        <Col lg={5} sm={12} className="mx-auto">
          <Card className="shadow-lg mt-3">
            <Card.Body className="mt-4 mx-3">
              <Form onSubmit={submitHandler}>
                <h3 className="text-center mb-3">{title}</h3>
                {mode === "register" && (
                  <div className="d-flex justify-content-end">
                    <Form.Check
                      type="switch"
                      label="Register as a vendor"
                      value={isVendor}
                      onChange={(e) => setIsVendor(!isVendor)}
                      className="mb-3"
                    />
                  </div>
                )}

                {mode !== "sent-reset-email" && (
                  <EmailField
                    email={email}
                    setEmail={setEmail}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}

                {(mode === "login" || mode === "register") && (
                  <PasswordField
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
                {mode !== "sent-reset-email" ? (
                  <>
                    <div className="d-grid mt-4">
                      <Button type="submit" variant="primary">
                        {mode === "login" && "Sign In"}
                        {mode === "register" && "Create Account"}
                        {mode === "update-password" && "Update Password"}
                      </Button>
                    </div>
                    <Row className="mt-3 mb-5">
                      <small className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center mb-2 mb-md-0">
                        {mode === "login" && (
                          <>
                            Don't have an account?{" "}
                            <Link
                              to="/register"
                              state={{ from }}
                              className="ms-1"
                            >
                              Sign up
                            </Link>
                          </>
                        )}
                        {mode === "register" && (
                          <>
                            Already have an account?{" "}
                            <Link to="/login" state={{ from }} className="ms-1">
                              Sign in
                            </Link>
                          </>
                        )}
                      </small>
                      {mode === "login" && (
                        <small className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
                          <a href="/update-password" className="ms-1">
                            Forgot password?
                          </a>
                        </small>
                      )}
                    </Row>
                  </>
                ) : (
                  <Row className="justify-content-center">
                    <Col className="my-4 mx-4 text-center">
                      <i
                        className="bi bi-envelope-check"
                        style={{ fontSize: "100px" }}
                      ></i>
                      <p>
                        We have sent the update password link to your email,
                        please check that!
                      </p>
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
