import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import SentResetEmailScreen from "./screens/SentResetEmailScreen";
import { Provider } from "react-redux";
import store from "./store";
import CheckoutScreen from "./screens/CheckoutScreen";
import TestScreen from "./screens/TestScreen";
import { enableMapSet } from "immer";
import ProductDetailScreen from "./screens/ProductDetailScreen";

enableMapSet();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/update-password" element={<UpdatePasswordScreen />} />
      <Route path="/sent-reset-email" element={<SentResetEmailScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/product/:id" element={<ProductDetailScreen />} />

      <Route />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
