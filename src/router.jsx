import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PromoListPage from "./pages/PromoListPage";

//import EmployeeAccountPage from "./pages/EmployeeAccountPage";
import UsersListPage from "./pages/UsersListPage";
import ClientAccountPage from "./pages/ClientAccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";

import AdminAccountPage from "./pages/AdminAccountPage";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

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
      { path: "admin", element: <ProtectedRoute role="admin"><AdminAccountPage /></ProtectedRoute> },
      { path: "admin/products", element: <ProtectedRoute role="admin"><AdminProducts /></ProtectedRoute> },
      { path: "admin/orders", element: <ProtectedRoute role="admin"><AdminOrders /></ProtectedRoute> },

      //{ path: "employee_account", element: <EmployeeAccountPage /> },
      { path: "admin/users", element: <UsersListPage /> },

      { path: "orders", element: <OrdersPage /> },
    ],
  },
]);