import { Routes, Route } from "react-router-dom";
import SearchResultCategory from "../components/SearchResultCategory/SearchResultCategory";
import HomePage from "../pages/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/search" element={<SearchResultCategory />}></Route>
    </Routes>
  );
};

export default Router;
