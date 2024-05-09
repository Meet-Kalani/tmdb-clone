import PropTypes from "prop-types";
import style from "./list.module.scss";
import Filter from "../Filter/Filter";

const List = ({ items, checkSelection, toggleSelection }) => (
  <Filter title="Certification">
    <ul className={style['list-container']}>
      {
      items.map(({ id, label }) => (
        // eslint-disable-next-line
        <li
          className={`${style['list-item']} ${checkSelection(id) && style['selected-item']}`}
          key={id}
          onClick={() => {
            toggleSelection(id);
          }}
        >
          {label}
        </li>
      ))
    }
    </ul>
  </Filter>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  checkSelection: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
};

export default List;
