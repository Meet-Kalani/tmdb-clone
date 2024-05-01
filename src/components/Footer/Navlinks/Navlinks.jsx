import PropTypes from "prop-types";
import style from "./navlinks.module.scss";

const Navlinks = ({ label, data }) => (
  <div className={style["footer-navlinks"]}>
    <h3 className={style["footer-navlinks-title"]}>{label}</h3>
    <UnorderedList data={data} />
  </div>
);

Navlinks.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

const UnorderedList = ({ data }) => (
  <ul className={style.list}>
    {data.map(({ id, label, link }) => (
      <li className={style["navlink-wrapper"]} key={id}>
        <a className={style.navlink} href={link}>
          {label}
        </a>
      </li>
    ))}
  </ul>
);

UnorderedList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default Navlinks;
