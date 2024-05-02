import { useState } from "react";
import style from "./watch-filter.module.scss";

const WatchFilter = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  return (
    <div className={style["watch-filter"]}>
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
        <h2 className={style["filter-title"]}>Where To Watch</h2>
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
          <div className={style["content-wrapper"]}>
            <span className={style["filter-content-title"]}>Country</span>
            <select
              className={style["sort-options-container"]}
              id="sort_by"
              name="sort_by"
            >
              <option
                className={style["sort-option"]}
                value="popularity_descending"
                selected
              >
                United States
              </option>
              <option
                className={style["sort-option"]}
                value="popularity_ascending"
              >
                Popularity Ascending
              </option>
              <option
                className={style["sort-option"]}
                value="rating_descending"
              >
                Rating Descending
              </option>
              <option className={style["sort-option"]} value="rating_ascending">
                Rating Ascending
              </option>
              <option
                className={style["sort-option"]}
                value="release_date_descending"
              >
                Release Date Descending
              </option>
              <option
                className={style["sort-option"]}
                value="release_date_ascending"
              >
                Release Date Ascending
              </option>
              <option className={style["sort-option"]} value="text_ascending">
                Title (A-Z)
              </option>
              <option className={style["sort-option"]} value="text_descending">
                Title (Z-A)
              </option>
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WatchFilter;
