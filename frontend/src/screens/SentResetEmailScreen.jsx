import FormContainer from "../components/FormContainer";

const SentResetEmailScreen = () => {
  return (
    <FormContainer>
        <div className="row justify-content-center">
          <div className="col">
            <p>
              We have sent the update password link to your email, please check
              that!
            </p>
          </div>
        </div>
    </FormContainer>
  );
};

export default SentResetEmailScreen;
