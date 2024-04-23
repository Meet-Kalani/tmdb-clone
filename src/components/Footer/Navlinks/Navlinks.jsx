import PropTypes from "prop-types";
import style from "./navlinks.module.scss";

const Navlinks = ({ label, data }) => {
  return (
    <div className={style["footer-navlinks"]}>
      <h3 className={style["footer-navlinks-title"]}>{label}</h3>
      <UnorderedList data={data} />
    </div>
  );
};

Navlinks.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

const UnorderedList = ({ data }) => {
  return (
    <ul className={style["list"]}>
      {data.map(({ id, label, link }) => {
        return (
          <li key={id} className={style["navlink-wrapper"]}>
            <a href={link} className={style["navlink"]}>
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

UnorderedList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

export default Navlinks;
