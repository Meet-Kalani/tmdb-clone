import { useState } from "react";
import style from "./search-result-category.module.scss";
import PropTypes from "prop-types";

// correct the prop type of searchData prop and of data prop

const SearchResultCategory = ({ openLinkId, setOpenLinkId, searchData }) => {
  const handleOpenLink = (id) => {
    setOpenLinkId(id);
  };

  return (
    <div className={style["search-result-container"]}>
      <div className={style["header"]}>
        <h3 className={style["title"]}>Search Results</h3>
      </div>
      <div className={style["content"]}>
        <ul className={style["category-container"]}>
          {searchData.map(({ id, label, href, data }) => {
            return (
              <CategoryItem
                key={id}
                id={id}
                handleOpenLink={handleOpenLink}
                openLinkId={openLinkId}
                label={label}
                href={href}
                data={data}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

SearchResultCategory.propTypes = {
  openLinkId: PropTypes.number,
  setOpenLinkId: PropTypes.func,
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
      data: PropTypes.shape({}),
    })
  ),
};

const CategoryItem = ({
  id,
  openLinkId,
  handleOpenLink,
  label,
  href,
  data,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Movies");

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    handleOpenLink(id);
  };
  return (
    <li
      className={
        selectedCategory === label && openLinkId === id
          ? `${style["category-wrapper"]} ${style["selected"]}`
          : `${style["category-wrapper"]}`
      }
      onClick={() => {
        handleCategorySelection(label);
      }}
    >
      <a href={href} className={style["category"]}>
        {label}
      </a>
      <span className={style["count"]}>{data.length}</span>
    </li>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.number,
  openLinkId: PropTypes.number,
  handleOpenLink: PropTypes.func,
  label: PropTypes.string,
  href: PropTypes.string,
  searchParam: PropTypes.string,
  data: PropTypes.shape({
    length: PropTypes.number,
  }),
};

export default SearchResultCategory;
