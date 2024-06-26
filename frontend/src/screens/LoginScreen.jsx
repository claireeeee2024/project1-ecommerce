import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { validateForm } from "../utils/validation";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(from);
    }
  }, [userInfo, navigate, from]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(email, password);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully");
      navigate(from);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthForm
      mode="login"
      title="Sign in to your account"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={submitHandler}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default LoginScreen;
