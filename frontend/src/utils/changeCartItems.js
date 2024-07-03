import {
  useCreateCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../slices/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import _ from "lodash";

export const useCartOperation = () => {
  const navigate = useNavigate();
  const [createCartItem] = useCreateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleChange = async (userId, product, e) => {
    const itemId = product._id;
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

  const handleCreate = async (userInfo, newItem) => {
    if (!userInfo) {
      window.alert("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    try {
      console.log(userInfo._id);
      await createCartItem({
        userId: userInfo._id,
        newItem: {
          name: newItem.name,
          qty: 1,
          image: newItem.images[0],
          price: newItem.price,
          id: newItem._id,
          inStock: newItem.inStock,
        },
      }).unwrap();
      console.log(`Item with id ${newItem._id} is added`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (userId, product, qty) => {
    const itemId = product._id;
    const inStock = product.inStock;
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

  const handleMinus = async (userId, product, qty) => {
    const itemId = product._id;
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

  const debounceHandleCreate = useCallback(
    _.debounce((userInfo, newItem) => {
      handleCreate(userInfo, newItem);
    }, 500)
  );

  const debouncedHandleAdd = useCallback(
    _.debounce((userId, product, qty) => {
      handleAdd(userId, product, qty);
    }, 500)
  );

  const debouncedHandleMinus = useCallback(
    _.debounce((userId, product, qty) => {
      handleMinus(userId, product, qty);
    }, 500)
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return {
    handleAdd,
    handleMinus,
    handleChange,
    handleRemove,
    handleCheckout,
    debouncedHandleAdd,
    debouncedHandleMinus,
    debounceHandleCreate,
  };
};
