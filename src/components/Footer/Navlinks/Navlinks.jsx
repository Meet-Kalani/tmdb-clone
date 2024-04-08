import UnorderedList from "../../UI/UnorderedList/UnorderedList";
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

export default Navlinks;
