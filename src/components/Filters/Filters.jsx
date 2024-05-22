import {
  useContext, useEffect, useRef, useState,
} from "react";
import style from "./filters.module.scss";
import SortFilter from "./SortFilter/SortFilter";
import WatchFilter from "./WatchFilter/WatchFilter";
import GeneralFilter from "./GeneralFilter/GeneralFilter";
import SelectedFilterContext from "../../pages/CategoriesPage/context";

const Filters = () => {
  const { fetchData, isInitialFiltersChanged } = useContext(SelectedFilterContext);
  const [isVisible, setIsVisible] = useState(false);
  const searchBtnRef = useRef(null);

  useEffect(() => {
    const searchBtnRefCurrent = searchBtnRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
    );

    if (searchBtnRefCurrent) {
      observer.observe(searchBtnRefCurrent);
    }

    return () => {
      if (searchBtnRefCurrent) {
        observer.unobserve(searchBtnRefCurrent);
      }
    };
  }, []);

  const searchBtnClassnames = `${style['search-btn']}
  ${!isVisible && isInitialFiltersChanged ? style['search-btn-bottom'] : ''}
  ${!isInitialFiltersChanged ? style['search-btn-initial'] : ''}`;

  return (
    <div className={style.filters}>
      <SortFilter />
      <WatchFilter />
      <GeneralFilter />
      <div ref={searchBtnRef}>
        <button
          className={searchBtnClassnames}
          disabled={!isInitialFiltersChanged}
          type="button"
          onClick={() => fetchData(true)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
