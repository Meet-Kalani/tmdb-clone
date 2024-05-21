import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
// import CategoriesPage from "../pages/CategoriesPage/CategoriesPage";
import Error from "../pages/ErrorPage/ErrorPage";
import NotFound from "../pages/NotFound/NotFound";
import RootLayout from "../layout/RootLayout";
import loader from "./loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{
      index: true,
      element: <HomePage />,
    },
    {
      path: ":contentType/:id",
      element: <DetailsPage />,
      errorElement: <NotFound />,
      loader,
    },
    {
      path: "error",
      element: <Error />,
    },
    {
      path: "*",
      element: <NotFound />,
    }],
  },
]);

export default router;
