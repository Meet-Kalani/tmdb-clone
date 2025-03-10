import style from "./filters.module.scss";
import SortFilter from "../SortFilter/SortFilter";
import WatchFilter from "../WatchFilter/WatchFilter";

const Filters = () => {
  return (
    <div className={style['filters']}>
      <SortFilter />
      <WatchFilter />
    </div>
  );
};

export default Filters;
