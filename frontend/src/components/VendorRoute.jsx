import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "./Loader";

const VendorRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isVendor) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (productId && product.vendor !== userInfo._id) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;

};

export default VendorRoute;
