const EmailField = ({ email, setEmail, error }) => {
  return (
    <div className="mb-3">
      <small htmlFor="email" className="form-label text-muted">
        Email
      </small>
      <input
        type="text"
        id="email"
        placeholder="Enter email"
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-end text-danger small">{error}</p>}
    </div>
  );
};
const PasswordField = ({ password, setPassword, error }) => {
  return (
    <div className="mb-3">
      <small htmlFor="password" className="form-label text-muted">
        Password
      </small>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-end text-danger small">{error}</p>}
    </div>
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
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="container">
      <div className="row py-lg-3">
        <div className="col-lg-5 col-md-8 mx-auto">
          <div className="card shadow-lg mt-3">
            <div className="card-body mt-4 mx-3">
              {mode !== "sent-reset-email" ? (
                <form onSubmit={submitHandler}>
                  <h3 className="text-bg-light text-center mb-3">{title}</h3>
                  <div className="text-center mb-4">
                    <small className="text-muted">
                      {mode === "update-password" &&
                        "Enter your email link, we will send you the recovery link"}
                    </small>
                  </div>
                  {mode === "register" && (
                    <div className="form-check form-switch d-flex justify-content-md-end justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isVendor"
                        checked={isVendor}
                        onChange={(e) => setIsVendor(e.target.checked)}
                      />
                      <label
                        className="form-check-label ms-2 mb-2"
                        htmlFor="isVendor"
                      >
                        Register as a vendor
                      </label>
                    </div>
                  )}
                  {errors.apiError && (
                    <div className="alert alert-danger mt-3 px-3 py-2">
                      {errors.apiError}
                    </div>
                  )}

                  <EmailField
                    email={email}
                    setEmail={setEmail}
                    error={errors.email}
                  />
                  {(mode === "login" || mode === "register") && (
                    <PasswordField
                      password={password}
                      setPassword={setPassword}
                      error={errors.password}
                    />
                  )}
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary">
                      {mode === "login" && "Sign In"}
                      {mode === "register" && "Create Account"}
                      {mode === "update-password" && "Update Password"}
                    </button>
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
                </form>
              ) : (
                <div className="row justify-content-center text-center">
                  <div className="col">
                    <i
                      className="bi bi-envelope-check"
                      style={{ fontSize: "100px" }}
                    ></i>
                    <p className="mb-5">
                      We have sent the update password link to your email,
                      please check that!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
