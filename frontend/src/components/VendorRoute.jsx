import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const VendorRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isVendor) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default VendorRoute;
