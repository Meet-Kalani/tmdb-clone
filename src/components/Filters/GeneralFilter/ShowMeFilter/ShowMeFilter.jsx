import PropTypes from "prop-types";
import style from './show-me-filter.module.scss';

const ShowMeFilter = ({ contentType }) => (
  <div className={style['show-me-filter']}>
    <label className={style.label} htmlFor="all">
      <input className={style['radio-input']} id="all" type="radio" defaultChecked />
      Everything
    </label>
    <label className={`${style.label} ${style.disabled}`} htmlFor="seenmovies">
      <input className={style['radio-input']} id="seenmovies" type="radio" disabled />
      {contentType === 'tv' ? "TV Shows" : "Movies"}
      {' '}
      I Haven&#39;t Seen
    </label>
    <label className={`${style.label} ${style.disabled}`} htmlFor="unseenmovies">
      <input className={style['radio-input']} id="unseenmovies" type="radio" disabled />
      {contentType === 'tv' ? "TV Shows" : "Movies"}
      {' '}
      I Have Seen
    </label>
  </div>
);

ShowMeFilter.propTypes = {
  contentType: PropTypes.string.isRequired,
};

export default ShowMeFilter;
