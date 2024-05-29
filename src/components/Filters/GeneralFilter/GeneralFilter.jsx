import { useContext, useState } from "react";
import SelectedFilterContext from "../../../pages/CategoriesPage/context";
import { LANGUAGES } from "../../../constants/languages";
import style from "./general-filter.module.scss";
import {
  MINIMUM_USER_VOTES_MARKS,
  RUNTIME_MARKS,
  USER_SCORE_MARKS,
} from '../../../constants/filterSliderDefaults';
import { MOVIE_CERTIFICATIONS, TV_CERTIFICATIONS } from "../../../constants/certifications";
import { MOVIE_GENRES, TV_GENRES } from "../../../constants/genres";
import FilterWrapper from "./FilterWrapper/FilterWrapper";
import RangeSlider from "./RangeSlider/RangeSlider";
import List from "./List/List";
import ReleaseDateFilter from "./ReleaseDateFilter/ReleaseDateFilter";
import AvailabilityFilter from "./AvailabilityFilter/AvailabilityFilter";
import ShowMeFilter from "./ShowMeFilter/ShowMeFilter";

const SortFilter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    contentType,
    certifications,
    genres,
    userScore,
    minimumUserVotes,
    runtime,
    language,
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

  const checkSelectedCertifications = (certification) => certifications.has(certification);
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
        <FilterWrapper className={style['show-me-wrapper']} title="Show Me" tooltipMessage="Log in to filter items you've watched.">
          <ShowMeFilter contentType={contentType} />
        </FilterWrapper>
        <FilterWrapper className={style['availabilities-wrapper']} title="Availabilities">
          <AvailabilityFilter />
        </FilterWrapper>
        <FilterWrapper title={contentType === "tv" ? "Air Dates" : "Release Dates"}>
          <ReleaseDateFilter />
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
