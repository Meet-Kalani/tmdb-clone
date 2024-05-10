import PropTypes from "prop-types";
import style from "./list.module.scss";
import FilterWrapper from "../FilterWrapper/FilterWrapper";

const List = ({ items, checkSelection, toggleSelection }) => (
  <FilterWrapper title="Certification">
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
  </FilterWrapper>
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
