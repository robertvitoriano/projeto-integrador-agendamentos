import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./_layouts/AppLayout/AppLayout";
import { Home } from "./pages/Home/Home";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
]);
