import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./select-with-search.module.scss";
import { FLAG_BASE_URL } from "../../constants/constants";

const SelectWithSearch = ({ defaultOption, toggleOption, options }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [countryInput, setCountryInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(options);

  useEffect(() => {
    const lowerCaseInput = countryInput.toLowerCase();
    const filtered = options.filter(({ english_name: englishName }) => englishName.toLowerCase().includes(lowerCaseInput));
    setFilteredCountries(filtered);
  }, [countryInput, options]);

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
          {selectedOption.imageId ? <img alt={`${selectedOption.label}'s flag`} className={style.flag} src={`${FLAG_BASE_URL}/${selectedOption.id}.png`} /> : undefined}
          <span className={style.label}>
            {selectedOption.englishName}
          </span>
        </div>
        <div>
          <img alt="drop down arrow" className={style['arrow-dropdown']} src="/images/dropdown-arrow.png" />
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
              <img alt="search icon" className={style['search-icon']} src="/images/search-icon.svg" />
            </div>
            <ul className={style['country-list']}>
              {
                filteredCountries.map(({ iso_3166_1: id, english_name: englishName, image_id: imageId }) => (
                  <li
                    className={style.option}
                    key={id}
                    role="presentation"
                    onClick={() => {
                      setSelectedOption({ id, englishName, imageId });
                      toggleOption({ id, englishName, imageId });
                      toggleVisibility();
                    }}
                  >
                    {imageId ? <img alt={`${englishName}'s flag`} className={style.flag} src={`${FLAG_BASE_URL}/${imageId}.png`} /> : undefined}
                    <span className={style.label}>
                      {englishName}
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
  toggleOption: PropTypes.func.isRequired,
  defaultOption: PropTypes.shape({
    id: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    iso_3166_1: PropTypes.string,
    english_name: PropTypes.string,
    native_name: PropTypes.string,
  })).isRequired,
};

export default SelectWithSearch;
