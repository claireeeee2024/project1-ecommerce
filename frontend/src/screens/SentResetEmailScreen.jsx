import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const SentResetEmailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state?.fromUpdatePassword);
  useEffect(() => {
    if (!location.state?.fromUpdatePassword) {
      navigate("/unauthorized");
    }
  }, [location, navigate]);

  if (!location.state?.fromUpdatePassword) {
    return null;
  }

  return <AuthForm mode="sent-reset-email" />;
};

export default SentResetEmailScreen;
