import PropTypes from "prop-types";
import style from "./anchor-button.module.scss";

const AnchorButton = ({ children, hyperlink, className }) => (
  <a
    href={hyperlink}
    className={`
    ${style.button} ${className}`}
  >
    {children}
  </a>
);

AnchorButton.propTypes = {
  children: PropTypes.node.isRequired,
  hyperlink: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default AnchorButton;
