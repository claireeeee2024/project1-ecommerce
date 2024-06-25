import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ type, duration = 2000, children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return <>{show && <Alert variant={type}>{children}</Alert>}</>;
};

export default Message;
