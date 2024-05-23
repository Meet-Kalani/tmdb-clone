import { useContext, useState } from "react";
import style from "./watch-filter.module.scss";
import WatchProvider from "./WatchProvider/WatchProvider";
import SelectedFilterContext from '../../../pages/CategoriesPage/context';
import SelectWithSearch from "../../SelectWithSearch/SelectWithSearch";

const WatchFilter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { watchProvidersList, OTTRegion, toggleOTTRegion } = useContext(SelectedFilterContext);

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  const watchProviderCount = watchProvidersList.length;

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
        <div className={style.wrapper}>
          <span className={style['watch-provider-count']}>{watchProviderCount}</span>
          <span
            className={
            !isVisible
              ? `${style["right-arrow"]}`
              : `${style["right-arrow"]} ${style["down-arrow"]}`
          }
          />
        </div>
      </div>
      <div className={isVisible ? style["filter-content"] : style.hidden}>
        <div className={style["content-wrapper"]}>
          <span className={style["filter-content-title"]}>Country</span>
          <SelectWithSearch defaultCountry={OTTRegion} toggleCountry={toggleOTTRegion} />
          <WatchProvider />
        </div>
      </div>
    </div>
  );
};

export default WatchFilter;
