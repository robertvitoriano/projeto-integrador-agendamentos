import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./_layouts/AppLayout/AppLayout";
import { Access } from "./pages/Home/Access";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Access />,
      }
    ],
  },
]);
