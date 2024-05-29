import { useContext, useState } from "react";
import style from "./availability-filter.module.scss";
import SelectedFilterContext from "../../../../pages/CategoriesPage/context";
import { AVAILABILITIES } from "../../../../constants/availabilities";

const AvailabilityFilter = () => {
  const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(true);

  const { availabilities, toggleAvailabilities } = useContext(SelectedFilterContext);

  const checkSelectedAvailabilities = (availability) => availabilities.has(availability);
  return (
    <div className={style['availability-filter']}>
      <label className={style.label} htmlFor="unseenmovies">
        <input
          checked={isAvailabilityVisible}
          className={style['checkbox-input']}
          id="unseenmovies"
          type="checkbox"
          onChange={() => {
            setIsAvailabilityVisible((previousValue) => !previousValue);
          }}
        />
        Search all availabilities?
      </label>
      {
        !isAvailabilityVisible ? AVAILABILITIES.map(({ id, label }) => (
          <label className={style.label} htmlFor="unseenmovies" key={id}>
            <input
              checked={checkSelectedAvailabilities(label)}
              className={style['checkbox-input']}
              id="unseenmovies"
              type="checkbox"
              onChange={() => {
                toggleAvailabilities(label);
              }}
            />
            {label}
          </label>
        )) : null
       }
    </div>
  );
};

export default AvailabilityFilter;
