import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { validateForm } from "../utils/validation";
import { useUpdatePasswordMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";

const UpdatePasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(email, "update-password");
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }
    try {
      await updatePassword({ email }).unwrap();
      navigate("/sent-reset-email");
    } catch (error) {
      setErrors({ apiError: error.data?.message || "Update password failed" });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthForm
      mode="update-password"
      title="Update your password"
      onSubmit={submitHandler}
      email={email}
      setEmail={setEmail}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default UpdatePasswordScreen;
