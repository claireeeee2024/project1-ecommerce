import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";

const UpdatePasswordScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log("Sent link");
    navigate("/sent-reset-email");
  };

  return (
    <FormContainer>
      <h1>Update your password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Text className="text-muted">
          Enter your email link, we will send you the recovery link
        </Form.Text>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdatePasswordScreen;
