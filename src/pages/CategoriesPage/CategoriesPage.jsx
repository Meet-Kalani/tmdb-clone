import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import style from "./categories-page.module.scss";
import Filters from "../../components/Filters/Filters";
import CategoryList from "../../components/CategoryList/CategoryList";
import { CATEGORY_TITLE } from "../../utils/categoryTitle";
import useTitle from "../../hooks/useTitle";
import { fetchCategoriesContent, fetchSortedContent } from "../../service/api";
import { notifyError, removeDuplicates } from "../../utils/helpers";

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const defaultSelectedSort = 'popularity_descending';
  const [selectedSort, setSelectedSort] = useState(defaultSelectedSort);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategoriesContent(category, contentType, 1);
        setData(res);
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [category, contentType]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSortedContent(contentType, selectedSort, 1);
        setData(res);
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [contentType, selectedSort]);

  const fetchData = async () => {
    try {
      // console.log(selectedSort, defaultSelectedSort);
      if (selectedSort !== defaultSelectedSort) {
        const res = await fetchSortedContent(contentType, selectedSort, pageNumber);
        setData((previousValue) => {
          const results = removeDuplicates([...previousValue.results, ...res.results]);

          return {
            page: res.page,
            results,
            total_pages: res.total_pages,
            total_results: res.total_results,
          };
        });
      }
      else {
        const res = await fetchCategoriesContent(category, contentType, pageNumber);
        setData((previousValue) => {
          const results = removeDuplicates([...previousValue.results, ...res.results]);

          return {
            page: res.page,
            results,
            total_pages: res.total_pages,
            total_results: res.total_results,
          };
        });
      }
    }
    catch (err) {
      notifyError(err);
    }
    finally {
      setPageNumber((previousValue) => previousValue + 1);
    }
  };

  const { title } = CATEGORY_TITLE.find(({ urlSlug }) => urlSlug === category);
  const documentTitle = `${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'} — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  const selectSort = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <>
      <ToastContainer />
      <div className={style['category-page']}>
        <div className={style['category-header']}>
          <h2 className={style['category-title']}>{`${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'}`}</h2>
        </div>
        <div className={style['category-body']}>
          <Filters selectedSort={selectedSort} selectSort={selectSort} />
          <CategoryList
            contentType={contentType}
            data={data}
            fetchData={fetchData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
