import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from "./routes/Home";
import AboutUs from "./routes/AboutUs";
import Dashboard from "./routes/Dashboard";
import Projects from "./routes/Projects";
import Karaokes from "./routes/Karaokes";
import Posts from "./routes/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/karaokes",
    element: <Karaokes />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);