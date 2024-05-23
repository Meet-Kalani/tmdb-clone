import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./select-with-search.module.scss";
import { FLAG_BASE_URL } from "../../constants/constants";
import { OTT_REGIONS } from "../../utils/ottRegions";

const SelectWithSearch = ({ defaultCountry, toggleCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    id: defaultCountry.id,
    country: defaultCountry.country,
  });
  const [countryInput, setCountryInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(OTT_REGIONS);

  useEffect(() => {
    const lowerCaseInput = countryInput.toLowerCase();
    const filtered = OTT_REGIONS.filter(({ english_name: englishName }) => englishName.toLowerCase().includes(lowerCaseInput));
    setFilteredCountries(filtered);
  }, [countryInput]);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  return (
    <div className={style['select-with-search']}>
      <div
        className={style['selected-option']}
        role="button"
        tabIndex={0}
        onClick={toggleVisibility}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            toggleVisibility();
          }
        }}
      >
        <div className={style['label-wrapper']}>
          <img alt={`${selectedCountry.label}'s flag`} className={style.flag} src={`${FLAG_BASE_URL}/${selectedCountry.id}.png`} />
          <span className={style.label}>
            {selectedCountry.country}
          </span>
        </div>
        <div>
          <img alt="drop down arrow" className={style['arrow-dropdown']} src="/dropdown-arrow.png" />
        </div>
      </div>
      {
        isVisible ? (
          <div className={style.options}>
            <div className={style['options-input-wrapper']}>
              <input
                className={style['options-input']}
                type="text"
                value={countryInput}
                onChange={(event) => setCountryInput(event.target.value)}
              />
              <img alt="search icon" className={style['search-icon']} src="/search-icon.png" />
            </div>
            <ul className={style['country-list']}>
              {
                filteredCountries.map(({ iso_3166_1: id, english_name: country }) => (
                  <li
                    className={style.option}
                    key={id}
                    role="presentation"
                    onClick={() => {
                      setSelectedCountry({ id, country });
                      toggleCountry({ id, country });
                      toggleVisibility();
                    }}
                  >
                    <img alt={`${country}'s flag`} className={style.flag} src={`${FLAG_BASE_URL}/${id}.png`} />
                    <span className={style.label}>
                      {country}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        ) : undefined
      }
    </div>
  );
};

SelectWithSearch.propTypes = {
  toggleCountry: PropTypes.func.isRequired,
  defaultCountry: PropTypes.shape({
    id: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default SelectWithSearch;
