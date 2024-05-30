import { useContext, useState } from 'react';
import style from './release-date-filter.module.scss';
import SelectWithSearch from '../../../SelectWithSearch/SelectWithSearch';
import { RELEASE_TYPES } from '../../../../constants/releaseTypes';
import SelectedFilterContext from '../../../../pages/CategoriesPage/context';
import { OTT_REGIONS } from '../../../../constants/ottRegions';

const ReleaseDateFilter = () => {
  const {
    contentType,
    releaseRegion,
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

  const checkSelectedReleaseTypes = (releaseType) => releaseTypes.has(releaseType);

  const defaultReleaseRegion = { id: releaseRegion.id, englishName: releaseRegion.country, imageId: releaseRegion.imageId };

  return (
    <div className={style['release-filter']}>
      {contentType === 'movie' ? (
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
              {!isReleaseTypeCountryVisible && (
                <div className={style['region-options-container']}>
                  <SelectWithSearch defaultOption={defaultReleaseRegion} options={OTT_REGIONS} toggleOption={toggleReleaseRegion} />
                </div>
              )}
            </>
          )}
          {!isMoreOptionsVisible && RELEASE_TYPES.map(({ id, label }) => (
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
              <input
                className={style['from-date']}
                id="from_date"
                min="1950-01-01"
                name="from_date"
                type="date"
                onChange={(event) => toggleReleaseDate(event, "gte")}
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
                value={releaseDate.lte}
                onChange={(event) => toggleReleaseDate(event, "lte")}
              />
            </label>
          </div>
        </>
      ) : (
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
          <div className={style['dates-container']}>
            <label className={style['from-date-label']} htmlFor="from_date">
              from
              <input
                className={style['from-date']}
                id="from_date"
                min="1930-01-01"
                name="from_date"
                type="date"
                onChange={(event) => {
                  if (isMoreOptionsVisible) {
                    toggleAirDate(event, "gte");
                  }
                  else {
                    toggleFirstAirDate(event, "gte");
                  }
                }}
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
                value={isMoreOptionsVisible ? airDate.lte : firstAirDate.lte}
                onChange={(event) => {
                  if (isMoreOptionsVisible) {
                    toggleAirDate(event, "lte");
                  }
                  else {
                    toggleFirstAirDate(event, "lte");
                  }
                }}
              />
            </label>
          </div>
        </>
      )}
      <div />
    </div>
  );
};

export default ReleaseDateFilter;
