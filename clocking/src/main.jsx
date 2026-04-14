import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HistoryProvider } from "./context/HistoryContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import Notfound from "./pages/NotFound.jsx";
import Session from "./pages/Session.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Register from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Notfound />,
  },
  {
    path: "/home",
    element: (
      //melindungi stopwatch dari orang tanpa token
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/session",
    //melindungi stopwatch dari orang tanpa token
    element: (
      <ProtectedRoute>
        <Session />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HistoryProvider>
      <RouterProvider router={router} />
    </HistoryProvider>
  </StrictMode>,
);
