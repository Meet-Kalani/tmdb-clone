import { useState } from "react";
import style from "./watch-filter.module.scss";
import CountrySelector from "./CountrySelector/CountrySelector";
import WatchProvider from "./WatchProvider/WatchProvider";

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
            <CountrySelector />
            <WatchProvider />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WatchFilter;
