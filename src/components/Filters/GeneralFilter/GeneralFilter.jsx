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
  const {
    contentType,
    availabilities,
    certifications,
    genres,
    userScore,
    minimumUserVotes,
    runtime,
    language,
    toggleAvailabilities,
    toggleUserScore,
    toggleMinimumUserVotes,
    toggleRuntime,
    toggleCertifications,
    toggleGenres,
    toggleLanguage,
  } = useContext(SelectedFilterContext);
  const GENRES = contentType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const CERTIFICATIONS = contentType === 'tv' ? TV_CERTIFICATIONS : MOVIE_CERTIFICATIONS;

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  const checkSelectedAvailabilities = (availability) => availabilities.has(availability);
  const checkSelectedCertifications = (certification) => certifications.has(certification);
  const checkSelectedGenres = (genre) => genres.has(genre);

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
                  checked={checkSelectedAvailabilities(defaultAvailability.label)}
                  className={style['checkbox-input']}
                  id="unseenmovies"
                  type="checkbox"
                  onChange={() => {
                    toggleAvailabilities(defaultAvailability.label);
                  }}

                />
                {defaultAvailability.label}
              </label>
              {
                !checkSelectedAvailabilities(defaultAvailability.label) ? AVAILABILITIES.slice(1).map(({ id, label }) => (
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
          <List checkSelection={checkSelectedGenres} items={GENRES} toggleSelection={toggleGenres} />
          <List checkSelection={checkSelectedCertifications} items={CERTIFICATIONS} toggleSelection={toggleCertifications} />
          <Filter title="Language" tooltipMessage="Filter items based on their original language.">
            <select
              className={style["language-options-container"]}
              id="language"
              name="language"
              value={language}
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
            handleOnChange={toggleUserScore}
            marks={USER_SCORE_MARKS}
            max={10}
            min={0}
            step={1}
            title="User Score"
            value={userScore}
          />
          <RangeSlider
            handleOnChange={toggleMinimumUserVotes}
            marks={MINIMUM_USER_VOTES_MARKS}
            max={500}
            min={0}
            step={50}
            title="Minimum User Votes"
            value={minimumUserVotes}
          />
          <RangeSlider
            handleOnChange={toggleRuntime}
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
