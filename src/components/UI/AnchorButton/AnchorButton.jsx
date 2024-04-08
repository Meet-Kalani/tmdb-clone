import style from "./anchorbutton.module.scss"
import PropTypes from 'prop-types';

const AnchorButton = ({ children, hyperlink, className }) => {
  return (
    <a href={hyperlink} className={`
    ${style['button']} ${className}`}>
      {children}
    </a>
  )
};

AnchorButton.propTypes = {
  children: PropTypes.string.isRequired,
  hyperlink: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AnchorButton;
