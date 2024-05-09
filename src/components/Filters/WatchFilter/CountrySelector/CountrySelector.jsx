import { useContext } from 'react';
import style from "./country-selector.module.scss";
import { OTT_REGIONS } from '../../../../utils/ottRegions';
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';

const CountrySelector = () => {
  const { OTTRegion, toggleOTTRegion } = useContext(SelectedFilterContext);

  return (
    <select
      className={style["sort-options-container"]}
      id="sort_by"
      name="sort_by"
      value={OTTRegion}
      onChange={(event) => {
        toggleOTTRegion(event.target.value);
      }}
    >
      {
      OTT_REGIONS.map(({ english_name: englishName, iso_3166_1: id }) => (
        <option
          className={style["sort-option"]}
          key={id}
          value={id}
        >
          {englishName}
        </option>
      ))
    }
    </select>
  );
};

export default CountrySelector;
