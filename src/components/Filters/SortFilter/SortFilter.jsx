import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./sort-filter.module.scss";
import SelectedFilterContext from "../../../pages/CategoriesPage/context";
import DropDown from "../../DropDown/DropDown";
import { SORT_OPTIONS_MOVIE, SORT_OPTIONS_TV } from "../../../constants/sortOptions";

const SortFilter = () => {
  const { contentType } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const { sort, toggleSort } = useContext(SelectedFilterContext);

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  return (
    <div className={style["sort-filter"]}>
      <div
        className={style["filter-header"]}
        role="button"
        tabIndex={0}
        onClick={toggleVisibility}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            toggleVisibility();
          }
        }}
      >
        <h2 className={style["filter-title"]}>Sort</h2>
        <span
          className={
            !isVisible
              ? `${style["right-arrow"]}`
              : `${style["right-arrow"]} ${style["down-arrow"]}`
          }
        />
      </div>
      <div className={isVisible ? style["filter-content"] : style.hidden}>
        <div className={style['content-wrapper']}>
          <span className={style["filter-content-title"]}>
            Sort Results By
          </span>
          <DropDown options={contentType === 'tv' ? SORT_OPTIONS_TV : SORT_OPTIONS_MOVIE} selectedOption={sort} toggleOption={toggleSort} />
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
