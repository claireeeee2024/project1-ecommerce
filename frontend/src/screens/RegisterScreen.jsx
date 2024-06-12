import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vendor, setVendor] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password, vendor);
    console.log("Registered");
  };

  return (
    <FormContainer>
      <h1>Sign up an account</h1>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Register as a vendor"
        value={vendor}
        onChange={(e) => setVendor(!vendor)}
      />
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account <Link to={"/login"}>Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
