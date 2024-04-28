import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import Error from "../pages/ErrorPage/ErrorPage";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => (
  <Routes>
    <Route element={<HomePage />} path="/" />
    <Route element={<DetailsPage />} path="/movie/:movieId" />
    <Route element={<DetailsPage />} path="/tv/:movieId" />
    <Route element={<Error />} path="/error" />
    <Route element={<NotFound />} path="*" />
  </Routes>
);

export default Router;
