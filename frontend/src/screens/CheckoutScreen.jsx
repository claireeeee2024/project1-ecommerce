import { useNavigate } from "react-router-dom";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div>icon</div>
      <h1>Opps, something went wrong!</h1>
      <button onClick={handleClick}>Go Home</button>
    </>
  );
};
export default CheckoutScreen;
