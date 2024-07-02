import {
  useDeleteCartItemMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
  useGetItemQuery,
} from "../slices/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import _ from "lodash";
import { setQtys, setTotal } from "../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export const useCartOperation = () => {
  const navigate = useNavigate();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const qtys = useSelector((state) => state.cart.qtys);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleChange = async (userId, product, e) => {
    const itemId = product._id;
    const price = product.price;
    try {
      await updateCartItem({
        userId,
        itemId,
        operation: e.target.value,
      }).unwrap();
      //   dispatch(setQtys(qtys + Number(e.target.value)));
      //   dispatch(setTotal(total + price * Number(e.target.value)));
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

  const handleAdd = async (userId, product, qty) => {
    const itemId = product._id;
    const inStock = product.inStock;
    const price = product.price;
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
      dispatch(setQtys(qtys + 1));
      dispatch(setTotal(total + price));
      //   dispatch((state) => setQtys(state.cart.qtys + 1));
      console.log(`Item with id ${itemId} is added by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinus = async (userId, product, qty) => {
    const itemId = product._id;
    const price = product.price;

    try {
      //如果点-1点的过快,这里还是会显示出负数
      if (qty <= 1) {
        dispatch(setQtys(qtys - 1));
        dispatch(setTotal(total - price));
        handleRemove(userId, itemId);
        return;
      }
      await updateCartItem({ userId, itemId, operation: "MINUS" }).unwrap();
      dispatch(setQtys(qtys - 1));
      dispatch(setTotal(total - price));

      //   dispatch((state) => setQtys(state.cart.qtys - 1));
      console.log(`Item with id ${itemId} is minused by 1`);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedHandleAdd = useCallback(
    _.debounce((userId, product, qty) => {
      handleAdd(userId, product, qty);
    }, 200),
    [qtys]
  );

  const debouncedHandleMinus = useCallback(
    _.debounce((userId, product, qty) => {
      handleMinus(userId, product, qty);
    }, 200),
    [qtys]
  );

  const handleCheckout = () => {
    navigate("/checkout");
    // onClose();
  };

  return {
    handleAdd,
    handleMinus,
    handleChange,
    handleRemove,
    handleCheckout,
    debouncedHandleAdd,
    debouncedHandleMinus,
  };
};
