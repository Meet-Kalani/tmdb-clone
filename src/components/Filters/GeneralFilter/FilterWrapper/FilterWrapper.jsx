import PropTypes from "prop-types";
import style from "./filter-wrapper.module.scss";

const FilterWrapper = ({
  title, tooltipMessage, className, children,
}) => (
  <div className={`${style.filter} ${className}`}>
    <div className={style['title-wrapper']}>
      <h4 className={style.title}>
        {title}
      </h4>
      {
        tooltipMessage ? (
          <div className={style.wrapper}>
            <img alt="question mark" className={style['question-mark-icon']} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-635-circle-question-58cc1ee10fd7a11546f8e97b1b5590b2d6e0c883acaea64a5f4c2c5b60f9f364.svg" />
            <span className={style.tooltip}>{tooltipMessage}</span>
          </div>
        ) : undefined
      }
    </div>
    {children}
  </div>
);

FilterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  tooltipMessage: PropTypes.string,
  className: PropTypes.string,
};

FilterWrapper.defaultProps = {
  tooltipMessage: undefined,
  className: undefined,
};

export default FilterWrapper;
