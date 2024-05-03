import PropTypes from "prop-types";
import style from "./filters.module.scss";
import SortFilter from "./SortFilter/SortFilter";
// import WatchFilter from "./WatchFilter/WatchFilter";

const Filters = ({ selectedSort, selectSort }) => (
  <div className={style.filters}>
    <SortFilter selectedSort={selectedSort} selectSort={selectSort} />
    {/* <WatchFilter /> */}
    <button className={style['search-btn']} type="button">Search</button>
  </div>
);

Filters.propTypes = {
  selectedSort: PropTypes.string.isRequired,
  selectSort: PropTypes.func.isRequired,
};

export default Filters;
