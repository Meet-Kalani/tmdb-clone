import PropTypes from "prop-types";
import style from "./unordered.module.scss";

const UnorderedList = ({ data }) => {
  return (
    <ul className={style["footer-navlinks-list"]}>
      {data.map(({ id, label, link }) => {
        return (
          <li key={id} className={style["navlink-wrapper"]}>
            <a href={link} className={style["footer-navlink"]}>
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

UnorderedList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ),
};

export default UnorderedList;
