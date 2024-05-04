import { useContext } from "react";
import style from "./filters.module.scss";
import SortFilter from "./SortFilter/SortFilter";
import WatchFilter from "./WatchFilter/WatchFilter";
import SelectedFilterContext from "../../pages/CategoriesPage/context";

const Filters = () => {
  const { fetchData } = useContext(SelectedFilterContext);

  return (
    <div className={style.filters}>
      <SortFilter />
      <WatchFilter />
      <button
        className={style['search-btn']}
        type="button"
        onClick={() => fetchData(true)}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
