import { useState } from "react";
import PropTypes from 'prop-types';
import style from "./dropdown.module.scss";

const DropDown = ({ options, selectedOption, toggleOption }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  return (
    <div className={style.dropdown}>
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
        <span className={style.label}>
          {selectedOption.label}
        </span>
        <img alt="drop down arrow" className={style['arrow-dropdown']} src="/images/dropdown-arrow.png" />
      </div>
      {
        isVisible ? (
          <ul className={style.options}>
            {
              options.map(({ id, value, label }) => (
                <li
                  className={selectedOption.value === value ? `${style.option} ${style['active-option']}` : `${style.option}`}
                  key={id}
                  role="presentation"
                  onClick={() => {
                    toggleOption({ value, label });
                    toggleVisibility();
                  }}
                >
                  {label}
                </li>
              ))
            }

          </ul>
        ) : undefined
      }
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  selectedOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  toggleOption: PropTypes.func.isRequired,
};

export default DropDown;
