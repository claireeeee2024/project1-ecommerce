import { useNavigate } from "react-router-dom";
import { CiCircleAlert } from "react-icons/ci";
import { Button } from "react-bootstrap";
const CheckoutScreen = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div style={style}>
      <div>
        <CiCircleAlert style={{ height: "200px", width: "200px" }} />
      </div>
      <h1>Opps, something went wrong!</h1>
      <Button onClick={handleClick}>Go Home</Button>
    </div>
  );
};

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
export default CheckoutScreen;
