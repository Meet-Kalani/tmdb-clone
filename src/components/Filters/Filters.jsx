import {
  useContext, useEffect, useRef, useState,
} from "react";
import style from "./filters.module.scss";
import SortFilter from "./SortFilter/SortFilter";
import WatchFilter from "./WatchFilter/WatchFilter";
import GeneralFilter from "./GeneralFilter/GeneralFilter";
import SelectedFilterContext from "../../pages/CategoriesPage/context";

const Filters = () => {
  const { fetchData } = useContext(SelectedFilterContext);
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

  return (
    <div className={style.filters}>
      <SortFilter />
      <WatchFilter />
      <GeneralFilter />
      <button
        className={isVisible ? style['search-btn'] : `${style['search-btn']} ${style['search-btn-bottom']}`}
        type="button"
        onClick={() => fetchData(true)}
      >
        Search
      </button>
      <div ref={searchBtnRef} />
    </div>
  );
};

export default Filters;
