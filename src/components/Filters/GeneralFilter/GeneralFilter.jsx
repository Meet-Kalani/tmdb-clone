import { useContext, useState } from "react";
import SelectedFilterContext from "../../../pages/CategoriesPage/context";
import { LANGUAGES } from "../../../constants/languages";
import style from "./general-filter.module.scss";
import {
  MINIMUM_USER_VOTES_MARKS,
  RUNTIME_MARKS,
  USER_SCORE_MARKS,
} from '../../../constants/filterSliderDefaults';
import { AVAILABILITIES } from "../../../constants/availabilities";
import { RELEASE_TYPES } from "../../../constants/releaseTypes";
import { MOVIE_CERTIFICATIONS, TV_CERTIFICATIONS } from "../../../constants/certifications";
import { MOVIE_GENRES, TV_GENRES } from "../../../constants/genres";
import FilterWrapper from "./FilterWrapper/FilterWrapper";
import RangeSlider from "./RangeSlider/RangeSlider";
import List from "./List/List";
import SelectWithSearch from "../../SelectWithSearch/SelectWithSearch";

const SortFilter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(true);
  const [isReleaseTypesVisible, setIsReleaseTypesVisible] = useState(true);
  const [isReleaseTypeCountryVisible, setIsReleaseTypeCountryVisible] = useState(true);
  const {
    contentType,
    availabilities,
    certifications,
    genres,
    userScore,
    minimumUserVotes,
    runtime,
    language,
    releaseDate,
    releaseRegion,
    releaseTypes,
    toggleReleaseDate,
    toggleAvailabilities,
    toggleUserScore,
    toggleReleaseRegion,
    toggleMinimumUserVotes,
    toggleRuntime,
    toggleReleaseTypes,
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
  const checkSelectedReleaseTypes = (releaseType) => releaseTypes.has(releaseType);
  const checkSelectedGenres = (genre) => genres.has(genre);

  const userScoreTooltipFormat = (value) => {
    const { gte, lte } = value;
    return `Rated ${gte}-${lte}`;
  };

  const runtimeTooltipFormat = (value) => {
    const { gte, lte } = value;
    return `${gte} minutes - ${lte} minutes`;
  };

  const minimumUserVotesTooltipFormat = (value) => {
    const { gte } = value;
    return `${gte}`;
  };

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
      <div className={isVisible ? style["filter-content"] : style.hidden}>
        <FilterWrapper title="Show Me" tooltipMessage="Log in to filter items you've watched.">
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
        </FilterWrapper>
        <FilterWrapper title="Availabilities">
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
        </FilterWrapper>
        <FilterWrapper title="Release Dates">
          <label className={style.label} htmlFor="release-types">
            <input
              checked={isReleaseTypesVisible}
              className={style['checkbox-input']}
              id="release-types"
              type="checkbox"
              onChange={() => setIsReleaseTypesVisible((prev) => !prev)}
            />
            Search all releases?
          </label>
          {!isReleaseTypesVisible && (
            <>
              <label className={`${style.label} ${style['release-region-label']}`} htmlFor="release-type-region">
                <input
                  checked={isReleaseTypeCountryVisible}
                  className={style['checkbox-input']}
                  id="release-type-region"
                  type="checkbox"
                  onChange={() => setIsReleaseTypeCountryVisible((prev) => !prev)}
                />
                Search all countries?
              </label>
              {!isReleaseTypeCountryVisible && (
              <div className={style['region-options-container']}>
                <SelectWithSearch defaultCountry={releaseRegion} toggleCountry={toggleReleaseRegion} />
              </div>
              )}
            </>
          )}
          {!isReleaseTypesVisible && RELEASE_TYPES.map(({ id, label }) => (
            <label className={style.label} htmlFor="release-type" key={id}>
              <input
                checked={checkSelectedReleaseTypes(id)}
                className={style['checkbox-input']}
                id="release-type"
                type="checkbox"
                onChange={() => toggleReleaseTypes(id)}
              />
              {label}
            </label>
          ))}
          <div className={style['dates-container']}>
            <label className={style['from-date-label']} htmlFor="from_date">
              from
              <input className={style['from-date']} id="from_date" min="1950-01-01" name="from_date" type="date" onChange={(event) => { toggleReleaseDate(event, "gte"); }} />
            </label>
            <label className={style['to-date-label']} htmlFor="to_date">
              to
              <input className={style['to-date']} id="to_date" max="2024-12-31" name="to_date" type="date" value={releaseDate.lte} onChange={(event) => { toggleReleaseDate(event, "lte"); }} />
            </label>
          </div>
        </FilterWrapper>
        <FilterWrapper title="Genres">
          <List checkSelection={checkSelectedGenres} items={GENRES} toggleSelection={toggleGenres} type="genre" />
        </FilterWrapper>
        <FilterWrapper title="Certification">
          <List checkSelection={checkSelectedCertifications} items={CERTIFICATIONS} toggleSelection={toggleCertifications} type="certification" />
        </FilterWrapper>
        <FilterWrapper title="Language" tooltipMessage="Filter items based on their original language.">
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
        </FilterWrapper>
        <FilterWrapper title="User Score">
          <RangeSlider
            handleOnChange={toggleUserScore}
            marks={USER_SCORE_MARKS}
            max={10}
            min={0}
            step={1}
            tooltipFormat={userScoreTooltipFormat}
            value={userScore}
          />
        </FilterWrapper>
        <FilterWrapper title="Minimum User Votes">
          <RangeSlider
            handleOnChange={toggleMinimumUserVotes}
            marks={MINIMUM_USER_VOTES_MARKS}
            max={500}
            min={0}
            step={50}
            tooltipFormat={minimumUserVotesTooltipFormat}
            value={minimumUserVotes}
          />
        </FilterWrapper>
        <FilterWrapper title="Runtime">
          <RangeSlider
            handleOnChange={toggleRuntime}
            marks={RUNTIME_MARKS}
            max={400}
            min={0}
            step={15}
            tooltipFormat={runtimeTooltipFormat}
            value={runtime}
          />
        </FilterWrapper>
      </div>
    </div>
  );
};

export default SortFilter;
