import { useState } from "react";
import PropTypes from "prop-types";
import style from "./nested-link.module.scss";

const NestedLink = ({ label, href, nestedLinks }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleNestedNavigationVisibility = () => {
    setIsVisible((previousValue) => !previousValue);
  };

  return (
    <li className={style["navlink-wrapper"]}>
      <a
        className={style.navlink}
        href={href}
        onClick={toggleNestedNavigationVisibility}
      >
        {label}
      </a>
      {isVisible ? (
        <ul className={style["nested-navlinks"]}>
          {nestedLinks.map(({ id, label: nestedLabel, href: nestedHref }) => (
            <li className={style["nested-navlink-wrapper"]} key={id}>
              <a className={style["nested-navlink"]} href={nestedHref}>
                {nestedLabel}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

NestedLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default NestedLink;
