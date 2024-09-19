import { createBrowserRouter } from "react-router-dom";
import Start from "./Start";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/:id",
    element: <Start />,
  },
]);
