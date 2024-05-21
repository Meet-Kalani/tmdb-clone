import PropTypes from "prop-types";
import style from "./nested-link.module.scss";

const NestedLink = ({
  href,
  label,
  nestedLinks,
}) => (
  <li className={style["navlink-wrapper"]}>
    <a
      className={style.navlink}
      href={href}
    >
      {label}
    </a>
    <div className={style["nested-navlinks-wrapper"]}>
      <ul className={style["nested-navlinks"]}>
        {nestedLinks.map(({ id: nestedId, label: nestedLabel, href: nestedHref }) => (
          <li
            className={nestedLabel === "Popular People" ? `${style["nested-navlink-wrapper"]} ${style.popular}` : style["nested-navlink-wrapper"]}
            key={nestedId}
          >
            <a className={style["nested-navlink"]} href={nestedHref}>
              {nestedLabel}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </li>
);

NestedLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default NestedLink;
