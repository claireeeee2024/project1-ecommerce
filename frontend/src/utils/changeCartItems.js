import {
  useDeleteCartItemMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
  useGetItemQuery,
} from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
export const useCartOperation = () => {
  const navigate = useNavigate();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleChange = async (userId, itemId, e) => {
    try {
      await updateCartItem({
        userId,
        itemId,
        operation: e.target.value,
      }).unwrap();
      console.log(`Item with id ${itemId} is modified by ${e.target.value}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (userId, itemId) => {
    try {
      await deleteCartItem({ userId, itemId }).unwrap();
      console.log(`Item with id ${itemId} is deleted`);
      console.log(`remove clicked`);
    } catch (error) {
      console.error("Failed to delete the item: ", error);
    }
  };

  const handleAdd = async (userId, itemId, qty, inStock) => {
    try {
      if (qty >= inStock) {
        await updateCartItem({
          userId,
          itemId,
          operation: inStock,
        }).unwrap();
        console.log(`Item with id ${itemId} is modified to ${inStock}`);
        return;
      }
      await updateCartItem({ userId, itemId, operation: "ADD" }).unwrap();
      console.log(`Item with id ${itemId} is added by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinus = async (userId, itemId, qty) => {
    try {
      //如果点-1点的过快,这里还是会显示出负数
      if (qty <= 1) {
        handleRemove(userId, itemId);
        return;
      }
      await updateCartItem({ userId, itemId, operation: "MINUS" }).unwrap();
      console.log(`Item with id ${itemId} is minused by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    // onClose();
  };

  return { handleAdd, handleMinus, handleChange, handleRemove, handleCheckout };
};
