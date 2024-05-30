import {
  useContext, useEffect, useRef, useState,
} from 'react';
import style from './release-date-filter.module.scss';
import SelectWithSearch from '../../../SelectWithSearch/SelectWithSearch';
import { RELEASE_TYPES } from '../../../../constants/releaseTypes';
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';
import { OTT_REGIONS } from '../../../../constants/ottRegions';

const ReleaseDateFilter = () => {
  const {
    contentType,
    releaseRegion,
    toggleSelectedTVDateType,
    toggleReleaseRegion,
    toggleReleaseDate,
    toggleAirDate,
    toggleFirstAirDate,
    firstAirDate,
    releaseDate,
    airDate,
    releaseTypes,
    toggleReleaseTypes,
  } = useContext(SelectedFilterContext);

  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(true);
  const [isReleaseTypeCountryVisible, setIsReleaseTypeCountryVisible] = useState(true);
  const dateRef = useRef();

  useEffect(() => {
    if (contentType === "movie") {
      toggleSelectedTVDateType('release_date');
    }
    else {
      toggleSelectedTVDateType(() => (isMoreOptionsVisible ? 'air_date' : 'first_air_date'));
    }
  }, [isMoreOptionsVisible, toggleSelectedTVDateType, contentType]);

  const defaultReleaseRegion = { id: releaseRegion.id, englishName: releaseRegion.country, imageId: releaseRegion.imageId };

  const handleDateChange = (event, type) => {
    if (contentType === 'movie') {
      toggleReleaseDate(event, type);
    }
    else if (isMoreOptionsVisible) {
      toggleAirDate(event, type);
    }
    else {
      toggleFirstAirDate(event, type);
    }

    if (type === "gte") {
      dateRef.current.style.color = "#495057";
    }
  };

  const renderReleaseTypes = () => (
    RELEASE_TYPES.map(({ id, label }) => (
      <label className={style.label} htmlFor={`release-type-${id}`} key={id}>
        <input
          checked={releaseTypes.has(id)}
          className={style['checkbox-input']}
          id={`release-type-${id}`}
          type="checkbox"
          onChange={() => toggleReleaseTypes(id)}
        />
        {label}
      </label>
    ))
  );

  const renderDateInputs = () => (
    <div className={style['dates-container']}>
      <label className={style['from-date-label']} htmlFor="from_date">
        from
        <input
          className={style['from-date']}
          id="from_date"
          min={contentType === 'movie' ? "1950-01-01" : "1930-01-01"}
          name="from_date"
          ref={dateRef}
          type="date"
          value={contentType === 'movie' ? releaseDate.gte : isMoreOptionsVisible ? airDate.gte : firstAirDate.gte}
          onChange={(event) => handleDateChange(event, "gte")}
        />
      </label>
      <label className={style['to-date-label']} htmlFor="to_date">
        to
        <input
          className={style['to-date']}
          id="to_date"
          max="2024-12-31"
          name="to_date"
          type="date"
          value={contentType === 'movie' ? releaseDate.lte : isMoreOptionsVisible ? airDate.lte : firstAirDate.lte}
          onChange={(event) => handleDateChange(event, "lte")}
        />
      </label>
    </div>
  );

  const renderRegionOptions = () => (
    !isReleaseTypeCountryVisible && (
      <div className={style['region-options-container']}>
        <SelectWithSearch defaultOption={defaultReleaseRegion} options={OTT_REGIONS} toggleOption={toggleReleaseRegion} />
      </div>
    )
  );

  const renderMovieOptions = () => (
    <>
      <label className={style.label} htmlFor="release-types">
        <input
          checked={isMoreOptionsVisible}
          className={style['checkbox-input']}
          id="release-types"
          type="checkbox"
          onChange={() => setIsMoreOptionsVisible((prev) => !prev)}
        />
        Search all releases?
      </label>
      {!isMoreOptionsVisible && (
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
          {renderRegionOptions()}
          {renderReleaseTypes()}
        </>
      )}
      {renderDateInputs()}
    </>
  );

  const renderTvOptions = () => (
    <>
      <label className={style.label} htmlFor="release-types">
        <input
          checked={isMoreOptionsVisible}
          className={style['checkbox-input']}
          id="release-types"
          type="checkbox"
          onChange={() => setIsMoreOptionsVisible((prev) => !prev)}
        />
        Search all episodes?
      </label>
      {!isMoreOptionsVisible && (
        <label className={`${style.label} ${style['release-region-label']}`} htmlFor="release-type-region">
          <input
            className={style['checkbox-input']}
            id="release-type-region"
            type="checkbox"
            defaultChecked
          />
          Search first air date?
        </label>
      )}
      {renderDateInputs()}
    </>
  );

  return (
    <div className={style['release-filter']}>
      {contentType === 'movie' ? renderMovieOptions() : renderTvOptions()}
      <div />
    </div>
  );
};

export default ReleaseDateFilter;
