import PropTypes from "prop-types";
import style from "./unordered-list.module.scss";

const UnorderedList = ({ data, className }) => {
  return (
    <ul className={`${style["list"]} ${className}`}>
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

export default UnorderedList;
