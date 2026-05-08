import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

// pages
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PromoListPage from "./pages/PromoListPage";

import EmployeeAccountPage from "./pages/EmployeeAccountPage";
import AdminAccountPage from "./pages/AdminAccountPage";
import UsersListPage from "./pages/UsersListPage";
import ClientAccountPage from "./pages/ClientAccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },

      // магазин
      { path: "catalog", element: <CatalogPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },

      // промо
      { path: "promo", element: <PromoListPage /> },

      // auth
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      // кабинет
      { path: "user_account", element: <ClientAccountPage /> },

      // админ
      { path: "admin", element: <AdminAccountPage /> },
      { path: "employee_account", element: <EmployeeAccountPage /> },
      { path: "admin/users", element: <UsersListPage /> },

      { path: "orders", element: <OrdersPage /> },
    ],
  },
]);