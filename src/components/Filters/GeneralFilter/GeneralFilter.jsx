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
  const { contentType } = useContext(SelectedFilterContext);
  const GENRES = contentType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const CERTIFICATIONS = contentType === 'tv' ? TV_CERTIFICATIONS : MOVIE_CERTIFICATIONS;

  const toggleVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    availabilities: new Set(AVAILABILITIES.map(({ id }) => id)),
    genres: new Set(),
    certifications: new Set(),
    language: "xx",
    userScore: [0, 10],
    minimumUserVotes: [0, 500],
    runtime: [0, 400],
  });

  const toggleGenres = (genre) => {
    setSelectedFilters((prevFilters) => {
      const newGenres = new Set(prevFilters.genres);
      if (newGenres.has(genre)) {
        newGenres.delete(genre);
      }
      else {
        newGenres.add(genre);
      }
      return {
        ...prevFilters,
        genres: newGenres,
      };
    });
  };

  const toggleCertifications = (certification) => {
    setSelectedFilters((prevFilters) => {
      const newCertifications = new Set(prevFilters.certifications);
      if (newCertifications.has(certification)) {
        newCertifications.delete(certification);
      }
      else {
        newCertifications.add(certification);
      }
      return {
        ...prevFilters,
        certifications: newCertifications,
      };
    });
  };

  const toggleLanguage = (language) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      language,
    }));
  };

  const handleUserScore = (e, newValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      userScore: newValue,
    }));
  };

  const handleMinimumUserVotes = (e, newValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      minimumUserVotes: newValue,
    }));
  };

  const handleRuntime = (e, newValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      runtime: newValue,
    }));
  };

  const toggleAvailabilities = (availability) => {
    setSelectedFilters((prevFilters) => {
      const newSelectedAvailabilities = new Set(prevFilters.selectedAvailabilities);
      if (newSelectedAvailabilities.has(availability)) {
        newSelectedAvailabilities.delete(availability);
      }
      else {
        newSelectedAvailabilities.add(availability);
      }
      return {
        ...prevFilters,
        selectedAvailabilities: newSelectedAvailabilities,
      };
    });
  };

  const checkSelectedAvailabilities = (availability) => selectedFilters.availabilities.has(availability);
  const checkSelectedCertifications = (certification) => selectedFilters.certifications.has(certification);
  const checkSelectedGenres = (genre) => selectedFilters.genres.has(genre);

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
          <List checkSelection={checkSelectedGenres} items={GENRES} toggleSelection={toggleGenres} />
          <List checkSelection={checkSelectedCertifications} items={CERTIFICATIONS} toggleSelection={toggleCertifications} />
          <Filter title="Language" tooltipMessage="Filter items based on their original language.">
            <select
              className={style["language-options-container"]}
              id="language"
              name="language"
              value={selectedFilters.language}
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
            value={selectedFilters.userScore}
          />
          <RangeSlider
            handleOnChange={handleMinimumUserVotes}
            marks={MINIMUM_USER_VOTES_MARKS}
            max={500}
            min={0}
            step={50}
            title="Minimum User Votes"
            value={selectedFilters.minimumUserVotes}
          />
          <RangeSlider
            handleOnChange={handleRuntime}
            marks={RUNTIME_MARKS}
            max={400}
            min={0}
            step={15}
            title="Runtime"
            value={selectedFilters.runtime}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SortFilter;
