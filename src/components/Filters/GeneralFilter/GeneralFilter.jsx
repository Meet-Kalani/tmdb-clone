import { useContext, useState } from "react";
import SelectedFilterContext from "../../../pages/CategoriesPage/context";
import { LANGUAGES } from "../../../utils/languages";
import style from "./general-filter.module.scss";
import {
  MINIMUM_USER_VOTES_MARKS,
  RUNTIME_MARKS,
  USER_SCORE_MARKS,
} from '../../../utils/filterSliderDefaults';
import { AVAILABILITIES } from "../../../utils/availabilities";
import { MOVIE_CERTIFICATIONS, TV_CERTIFICATIONS } from "../../../utils/certifications";
import { MOVIE_GENRES, TV_GENRES } from "../../../utils/genres";
import Filter from "./Filter/Filter";
import RangeSlider from "./RangeSlider/RangeSlider";
import List from "./List/List";

const SortFilter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const defaultAvailability = AVAILABILITIES[0];
  const [selectedAvailabilities, setSelectedAvailabilities] = useState(new Set(AVAILABILITIES.map(({ id }) => id)));
  const { contentType } = useContext(SelectedFilterContext);
  const genres = contentType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const certifications = contentType === 'tv' ? TV_CERTIFICATIONS : MOVIE_CERTIFICATIONS;
  const [selectedCertifications, setSelectedCertifications] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState("xx");
  const [userScore, setUserScore] = useState([0, 10]);
  const [minimumUserVotes, setMinimumUserVotes] = useState([0, 500]);
  const [runtime, setRuntime] = useState([0, 400]);
  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  const toggleGenres = (genre) => {
    setSelectedGenres((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(genre)) {
        newSelected.delete(genre);
      }
      else {
        newSelected.add(genre);
      }
      return newSelected;
    });
  };

  const toggleCertifications = (certification) => {
    setSelectedCertifications((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(certification)) {
        newSelected.delete(certification);
      }
      else {
        newSelected.add(certification);
      }
      return newSelected;
    });
  };

  const toggleLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleUserScore = (e, newValue) => {
    const [gte, lte] = newValue;
    setUserScore([gte, lte]);
  };

  const handleMinimumUserVotes = (e, newValue) => {
    const [gte, lte] = newValue;
    setMinimumUserVotes([gte, lte]);
  };

  const handleRuntime = (e, newValue) => {
    const [gte, lte] = newValue;
    setRuntime([gte, lte]);
  };

  const toggleAvailabilities = (availability) => {
    setSelectedAvailabilities((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(availability)) {
        newSelected.delete(availability);
      }
      else {
        newSelected.add(availability);
      }
      return newSelected;
    });
  };

  const checkSelectedAvailabilities = (availability) => selectedAvailabilities.has(availability);
  const checkSelectedCertifications = (certification) => selectedCertifications.has(certification);
  const checkSelectedGenres = (genre) => selectedGenres.has(genre);

  return (
    <div className={style["general-filter"]}>
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
        <h2 className={style["filter-title"]}>Filters</h2>
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
          <Filter title="Show Me" tooltipMessage="Log in to filter items you've watched.">
            <label className={style.label} htmlFor="all">
              <input className={style['radio-input']} id="all" type="radio" defaultChecked />
              Everything
            </label>
            <label className={`${style.label} ${style.disabled}`} htmlFor="seenmovies">
              <input className={style['radio-input']} id="seenmovies" type="radio" disabled />
              Movies I Haven&#39;t Seen
            </label>
            <label className={`${style.label} ${style.disabled}`} htmlFor="unseenmovies">
              <input className={style['radio-input']} id="unseenmovies" type="radio" disabled />
              Movies I Have Seen
            </label>
          </Filter>
          <Filter title="Availabilities">
            <div>
              <label className={style.label} htmlFor="unseenmovies">
                <input
                  checked={checkSelectedAvailabilities(defaultAvailability.id)}
                  className={style['checkbox-input']}
                  id="unseenmovies"
                  type="checkbox"
                  onChange={() => {
                    toggleAvailabilities(defaultAvailability.id);
                  }}

                />
                {defaultAvailability.label}
              </label>
              {
                !checkSelectedAvailabilities(defaultAvailability.id) ? AVAILABILITIES.slice(1).map(({ id, label }) => (
                  <label className={style.label} htmlFor="unseenmovies" key={id}>
                    <input
                      checked={checkSelectedAvailabilities(id)}
                      className={style['checkbox-input']}
                      id="unseenmovies"
                      type="checkbox"
                      onChange={() => {
                        toggleAvailabilities(id);
                      }}
                    />
                    {label}
                  </label>
                )) : null
              }
            </div>
          </Filter>
          <Filter title="Release Dates">
            <div className={style['dates-container']}>
              <label className={style['from-date-label']} htmlFor="from_date">
                from
                <input className={style['from-date']} id="from_date" min="1950-01-01" name="from_date" type="date" />
              </label>
              <label className={style['to-date-label']} htmlFor="to_date">
                to
                <input className={style['to-date']} id="to_date" max="2024-12-31" name="to_date" type="date" />
              </label>
            </div>
          </Filter>
          <List checkSelection={checkSelectedGenres} items={genres} toggleSelection={toggleGenres} />
          <List checkSelection={checkSelectedCertifications} items={certifications} toggleSelection={toggleCertifications} />
          <Filter title="Language" tooltipMessage="Filter items based on their original language.">
            <select
              className={style["language-options-container"]}
              id="language"
              name="language"
              value={selectedLanguage}
              onChange={(event) => {
                toggleLanguage(event.target.value);
              }}
            >
              {

                LANGUAGES.map(({ iso_639_1: id, english_name: label }) => (
                  <option
                    className={style["language-option"]}
                    key={id}
                    value={id}
                  >
                    {label}
                  </option>
                ))
              }
            </select>
          </Filter>
          <RangeSlider
            handleOnChange={handleUserScore}
            marks={USER_SCORE_MARKS}
            max={10}
            min={0}
            step={1}
            title="User Score"
            value={userScore}
          />
          <RangeSlider
            handleOnChange={handleMinimumUserVotes}
            marks={MINIMUM_USER_VOTES_MARKS}
            max={500}
            min={0}
            step={50}
            title="Minimum User Votes"
            value={minimumUserVotes}
          />
          <RangeSlider
            handleOnChange={handleRuntime}
            marks={RUNTIME_MARKS}
            max={400}
            min={0}
            step={15}
            title="Runtime"
            value={runtime}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SortFilter;
