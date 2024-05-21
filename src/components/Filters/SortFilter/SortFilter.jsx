import { useContext, useState } from "react";
import style from "./sort-filter.module.scss";
import SelectedFilterContext from "../../../pages/CategoriesPage/context";
import DropDown from "../../DropDown/DropDown";
import { SORT_OPTIONS } from "../../../utils/sortOptions";

const SortFilter = () => {
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
      {isVisible ? (
        <div className={style["filter-content"]}>
          <div className={style['content-wrapper']}>
            <span className={style["filter-content-title"]}>
              Sort Results By
            </span>
            <DropDown options={SORT_OPTIONS} selectedOption={sort} toggleOption={toggleSort} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SortFilter;
