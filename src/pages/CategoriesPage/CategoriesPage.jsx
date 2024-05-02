import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import style from "./categories-page.module.scss";
import Filters from "../../components/Filters/Filters";
import CategoryList from "../../components/CategoryList/CategoryList";
import { CATEGORY_TITLE } from "../../utils/categoryTitle";
import useTitle from "../../hooks/useTitle";
// https://api.themoviedb.org/3/discover/movie

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';

  const { title } = CATEGORY_TITLE.find(({ urlSlug }) => urlSlug === category);
  const documentTitle = `${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'} — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  return (
    <>
      <ToastContainer />
      <div className={style['category-page']}>
        <div className={style['category-header']}>
          <h2 className={style['category-title']}>{`${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'}`}</h2>
        </div>
        <div className={style['category-body']}>
          <Filters />
          <CategoryList category={category} contentType={contentType} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
