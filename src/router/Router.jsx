import { Routes, Route } from "react-router-dom";
import SearchResultCategory from "../components/SearchResultCategory/SearchResultCategory";
// import HomePage from "../pages/HomePage";
import Filters from "../components/Filters/Filters";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Filters />}></Route>
      <Route path="/search" element={<SearchResultCategory />}></Route>
    </Routes>
  );
};

export default Router;
