import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { validateForm } from "../utils/validation";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVendor, setIsVendor] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(email, password);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }
    try {
      const res = await register({ email, password, isVendor }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      setErrors({ apiError: error.data?.message || "Registration failed" });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthForm
      mode="register"
      title="Sign up an account"
      onSubmit={submitHandler}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isVendor={isVendor}
      setIsVendor={setIsVendor}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default RegisterScreen;
