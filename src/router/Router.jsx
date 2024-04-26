import { Routes, Route } from "react-router-dom";
// import SearchResultCategory from "../components/SearchResultCategory/SearchResultCategory";
import HomePage from "../pages/HomePage/HomePage";
import SearchResultPage from "../pages/SearchResultPage/SearchResultPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import NotFound from "../pages/NotFound/NotFound";
// import Filters from "../components/Filters/Filters";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/search" element={<SearchResultPage />}></Route>
      <Route path="/movie/:movieId" element={<MoviePage />}></Route>
      <Route path="/tv/:movieId" element={<MoviePage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default Router;
