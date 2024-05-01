import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Error from "../pages/ErrorPage/ErrorPage";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => (
  <Routes>
    <Route element={<HomePage />} path="/" />
    <Route element={<Error />} path="/error" />
    <Route element={<NotFound />} path="*" />
  </Routes>
);

export default Router;
