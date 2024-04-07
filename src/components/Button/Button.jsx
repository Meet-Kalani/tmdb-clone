import style from "./button.module.scss"
import PropTypes from 'prop-types';

const Button = ({ label, hyperlink, className }) => {
  return (
    <a href={hyperlink} className={`
    ${style['button']} ${className}`}>
      {label}
    </a>
  )
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  hyperlink: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
