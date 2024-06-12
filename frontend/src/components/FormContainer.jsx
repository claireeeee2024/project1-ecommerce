const FormContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="row py-lg-3">
        <div className="col-lg-5 col-md-8 mx-auto">
          <div className="card shadow-lg mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
