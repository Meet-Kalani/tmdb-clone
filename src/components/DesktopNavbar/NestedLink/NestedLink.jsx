import { useEffect, useState, useRef } from "react";
import style from "./nested-link.module.scss";
import PropTypes from "prop-types";

function NestedLink({
  href,
  label,
  nestedLinks,
  openNavlink,
  handleOpenNavlink,
  id,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (openNavlink !== id && isVisible) ||
        (navbarRef.current && !navbarRef.current.contains(event.target))
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
    setIsVisible((previousValue) => {
      return !previousValue;
    });

    handleOpenNavlink(id);
  };

  const tempStyle = {
    width: "max-content",
  };

  return (
    <li className={style["navlink-wrapper"]} ref={navbarRef}>
      <a
        href={href}
        className={style["navlink"]}
        onClick={handleNestedNavigationVisibility}
      >
        {label}
      </a>
      <div className={style["nested-navlinks-wrapper"]}>
        {isVisible && (
          <ul className={style["nested-navlinks"]}>
            {nestedLinks.map(({ id, label, href }) => (
              <li
                key={id}
                className={style["nested-navlink-wrapper"]}
                style={label === "Popular People" ? tempStyle : null}
              >
                <a href={href} className={style["nested-navlink"]}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

NestedLink.propTypes = {
  id: PropTypes.number,
  href: PropTypes.string,
  label: PropTypes.string,
  openNavlink: PropTypes.number,
  handleOpenNavlink: PropTypes.func,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default NestedLink;
