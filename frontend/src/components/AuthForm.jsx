import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { validatePassword, validateEmail } from "../utils/validation";
export const EmailField = ({ email, setEmail, errors, setErrors }) => {
  const handleChange = (e) => {
    setErrors({ ...errors, email: validateEmail(e.target.value) });
    setEmail(e.target.value);
  };

  return (
    <Form.Group className="mb-3">
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
    <Form.Group className="mb-3">
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
  onSubmit,
  errors,
  setErrors,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Container>
      <div className="row py-lg-3">
        <div className="col-lg-5 col-md-8 mx-auto">
          <Card className="shadow-lg mt-3">
            <Card.Body className="mt-4 mx-3">
              <Form onSubmit={submitHandler}>
                <h3 className="text-center mb-3">{title}</h3>
                {errors?.apiError && (
                  <div className="alert alert-danger mt-3 px-3 py-2">
                    {errors.apiError}
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
                    <div className="row mt-3 mb-5">
                      <small className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center mb-2 mb-md-0">
                        {mode === "login" && (
                          <>
                            Don't have an account?{" "}
                            <a href="/register" className="ms-1">
                              Sign up
                            </a>
                          </>
                        )}
                        {mode === "register" && (
                          <>
                            Already have an account?{" "}
                            <a href="/login" className="ms-1">
                              Sign in
                            </a>
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
                    </div>
                  </>
                ) : (
                  <div className="row justify-content-center">
                    <div className="col my-4 mx-4 text-center">
                      <i
                        className="bi bi-envelope-check"
                        style={{ fontSize: "100px" }}
                      ></i>
                      <p>
                        We have sent the update password link to your email,
                        please check that!
                      </p>
                    </div>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AuthForm;
