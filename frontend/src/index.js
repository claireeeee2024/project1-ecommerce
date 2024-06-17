import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import SentResetEmailScreen from "./screens/SentResetEmailScreen";
import { Provider } from "react-redux";
import CheckoutScreen from "./screens/CheckoutScreen";
import TestScreen from "./screens/TestScreen";
import ErrorScreen from "./screens/ErrorScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route index={true} path="/" element={<TestScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/update-password" element={<UpdatePasswordScreen />} />
      <Route path="/sent-reset-email" element={<SentResetEmailScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="*" element={<ErrorScreen />} />
      <Route />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
