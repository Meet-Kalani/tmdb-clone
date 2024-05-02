import { useState } from "react";
import style from "./sort-filter.module.scss";
import { SORT_OPTIONS } from "../../../utils/sortOptions";

const Filter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('popularity_descending');

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  const handleSortSelection = (event) => {
    setSelectedSort(event.target.value);
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
            <select
              className={style["sort-options-container"]}
              id="sort_by"
              name="sort_by"
              value={selectedSort}
              onChange={handleSortSelection}
            >
              {
                SORT_OPTIONS.map(({ id, label, value }) => (
                  <option
                    className={style["sort-option"]}
                    key={id}
                    value={value}
                  >
                    {label}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
