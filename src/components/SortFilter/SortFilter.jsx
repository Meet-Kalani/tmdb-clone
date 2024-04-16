import style from "./sort-filter.module.scss";
import { useState } from "react";

const Filter = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  return (
    <div className={style["sort-filter"]}>
      <div className={style["filter-header"]} onClick={handleVisibility}>
        <h2 className={style["filter-title"]}>Sort</h2>
        <span
          className={
            !isVisible
              ? `${style["right-arrow"]}`
              : `${style["right-arrow"]} ${style["down-arrow"]}`
          }
        ></span>
      </div>
      {isVisible && (
        <div className={style["filter-content"]}>
          <div className={style['content-wrapper']}>
            <span className={style["filter-content-title"]}>
              Sort Results By
            </span>
            <select
              name="sort_by"
              id="sort_by"
              className={style["sort-options-container"]}
            >
              <option
                value="popularity_descending"
                className={style["sort-option"]}
                selected
              >
                Popularity Descending
              </option>
              <option
                value="popularity_ascending"
                className={style["sort-option"]}
              >
                Popularity Ascending
              </option>
              <option
                value="rating_descending"
                className={style["sort-option"]}
              >
                Rating Descending
              </option>
              <option value="rating_ascending" className={style["sort-option"]}>
                Rating Ascending
              </option>
              <option
                value="release_date_descending"
                className={style["sort-option"]}
              >
                Release Date Descending
              </option>
              <option
                value="release_date_ascending"
                className={style["sort-option"]}
              >
                Release Date Ascending
              </option>
              <option value="text_ascending" className={style["sort-option"]}>
                Title (A-Z)
              </option>
              <option value="text_descending" className={style["sort-option"]}>
                Title (Z-A)
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
