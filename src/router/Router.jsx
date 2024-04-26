import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => (
  <Routes>
    <Route element={<HomePage />} path="/" />
    <Route element={<NotFound />} path="*" />
  </Routes>
);

export default Router;
