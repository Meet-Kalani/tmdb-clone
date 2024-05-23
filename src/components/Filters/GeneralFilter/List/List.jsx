import PropTypes from "prop-types";
import style from "./list.module.scss";

const List = ({
  items, checkSelection, toggleSelection, type,
}) => (
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
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  checkSelection: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default List;
