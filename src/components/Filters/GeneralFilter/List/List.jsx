import PropTypes from "prop-types";
import style from "./list.module.scss";
import FilterWrapper from "../FilterWrapper/FilterWrapper";

const List = ({
  items, checkSelection, toggleSelection, type, title,
}) => (
  <FilterWrapper title={title}>
    <ul className={style['list-container']}>
      {
      items.map(({ id, label }) => {
        const isSelected = type === 'genre' ? checkSelection(id) : checkSelection(label);
        const listItemClass = isSelected ? `${style['list-item']} ${style['selected-item']}` : style['list-item'];

        return (
          <li
            className={listItemClass}
            key={id}
            role="presentation"
            onClick={() => toggleSelection(type === 'genre' ? id : label)}
          >
            {label}
          </li>
        );
      })
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
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default List;
