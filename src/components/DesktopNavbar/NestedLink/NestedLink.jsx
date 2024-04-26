import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import style from "./nested-link.module.scss";

const NestedLink = ({
  href,
  label,
  nestedLinks,
  openNavlink,
  handleOpenNavlink,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (openNavlink !== id && isVisible)
        || (navbarRef.current && !navbarRef.current.contains(event.target))
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [id, openNavlink, isVisible]);

  const handleNestedNavigationVisibility = () => {
    setIsVisible((previousValue) => !previousValue);

    handleOpenNavlink(id);
  };

  const tempStyle = {
    width: "max-content",
  };

  return (
    <li className={style["navlink-wrapper"]} ref={navbarRef}>
      <a
        className={style.navlink}
        href={href}
        onClick={handleNestedNavigationVisibility}
      >
        {label}
      </a>
      <div className={style["nested-navlinks-wrapper"]}>
        {isVisible ? (
          <ul className={style["nested-navlinks"]}>
            {nestedLinks.map(({ id: nestedId, label: nestedLabel, href: nestedHref }) => (
              <li
                className={style["nested-navlink-wrapper"]}
                key={nestedId}
                style={label === "Popular People" ? tempStyle : null}
              >
                <a className={style["nested-navlink"]} href={nestedHref}>
                  {nestedLabel}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
};

NestedLink.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  openNavlink: PropTypes.number.isRequired,
  handleOpenNavlink: PropTypes.func.isRequired,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default NestedLink;
