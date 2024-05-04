import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
  useCallback, useEffect, useMemo, useState,
} from "react";
import style from "./categories-page.module.scss";
import Filters from "../../components/Filters/Filters";
import CategoryList from "../../components/CategoryList/CategoryList";
import { CATEGORY_TITLE } from "../../utils/categoryTitle";
import useTitle from "../../hooks/useTitle";
import {
  fetchCategoriesContent, fetchFilteredContent,
} from "../../service/api";
import { notifyError, removeDuplicates } from "../../utils/helpers";
import SelectedFilterContext from "./context";

const defaultSelectedSort = 'popularity.desc';

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [selectedSort, setSelectedSort] = useState(defaultSelectedSort);
  const [selectedOTTRegion, setSelectedOTTRegion] = useState('IN');
  const [selectedWatchProviders, setSelectedWatchProviders] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);

  const { title } = CATEGORY_TITLE.find(({ urlSlug }) => urlSlug === category);
  const documentTitle = `${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'} — The Movie Database (TMDB)`;
  useTitle(documentTitle);

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
        setIsScrollable(false);
      }
    })();
  }, [category, contentType]);

  const fetchData = useCallback(async (isFilterChanged) => {
    try {
      const filterQueryURL = `watch_region=${selectedOTTRegion}&page=${pageNumber}${selectedWatchProviders.length > 0 ? `&with_watch_providers=${selectedWatchProviders.join('|')}` : ''}&sort_by=${selectedSort}`;

      const res = await fetchFilteredContent(contentType, filterQueryURL);
      setData((previousValue) => {
        if (isFilterChanged) {
          return res;
        }
        const results = removeDuplicates([...previousValue.results, ...res.results]);
        return {
          page: res.page,
          results,
          total_pages: res.total_pages,
          total_results: res.total_results,
        };
      });
    }
    catch (err) {
      notifyError(err);
    }
    finally {
      if (isFilterChanged) {
        setPageNumber(1);
        setIsScrollable(false);
      }
      setPageNumber((previousValue) => previousValue + 1);
    }
  }, [contentType, pageNumber, selectedOTTRegion, selectedSort, selectedWatchProviders]);

  const selectSort = (sort) => {
    setSelectedSort(sort);
  };

  const selectOTTRegion = (region) => {
    setSelectedOTTRegion(region);
  };

  const selectWatchProviders = useCallback((watchProvider) => {
    if (selectedWatchProviders.length === 0) {
      setSelectedWatchProviders([watchProvider]);
    }
    else if (selectedWatchProviders.includes(watchProvider)) {
      const index = selectedWatchProviders.indexOf(watchProvider);
      selectedWatchProviders.splice(index, 1);
    }
    else {
      setSelectedWatchProviders((previousValue) => [...previousValue, watchProvider]);
    }
  }, [selectedWatchProviders]);

  const memoizedSelectedFilterValue = useMemo(() => ({
    selectedOTTRegion,
    contentType,
    selectWatchProviders,
    fetchData,
    selectedSort,
    selectOTTRegion,
    selectSort,
  }), [selectedOTTRegion, contentType, selectedSort, selectWatchProviders, fetchData]);

  const toggleScrolling = () => {
    setIsScrollable(true);
  };

  return (
    <>
      <ToastContainer />
      <div className={style['category-page']}>
        <div className={style['category-header']}>
          <h2 className={style['category-title']}>{`${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'}`}</h2>
        </div>
        <div className={style['category-body']}>
          <SelectedFilterContext.Provider value={memoizedSelectedFilterValue}>
            <Filters />
          </SelectedFilterContext.Provider>
          <CategoryList
            contentType={contentType}
            data={data}
            fetchData={fetchData}
            isLoading={isLoading}
            isScrollable={isScrollable}
            toggleScrolling={toggleScrolling}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
