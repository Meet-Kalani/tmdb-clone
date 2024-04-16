import { useState, useEffect } from "react";
import style from "./search-result-category.module.scss";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { VITE_API_READ_ACCESS_TOKEN } from "../../envConstants";
import axios from "axios";
import PropTypes from "prop-types";

const categories = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    count: 103,
    searchParam: "movie",
  },
  {
    id: 2,
    label: "TVShows",
    href: "#",
    count: 23,
    searchParam: "tv",
  },
  {
    id: 5,
    label: "Keywords",
    href: "#",
    count: 2,
    searchParam: "keyword",
  },
  {
    id: 6,
    label: "Collections",
    href: "#",
    count: 0,
    searchParam: "collection",
  },
  {
    id: 3,
    label: "People",
    href: "#",
    count: 27,
    searchParam: "person",
  },
  {
    id: 4,
    label: "Companies",
    href: "#",
    count: 33,
    searchParam: "company",
  },
];

// was doing api call before thaat have to make component for li and also edit the categories array

const SearchResultCategory = () => {
  const [openLink, setOpenLink] = useState(1);

  const handleOpenLink = (id) => {
    setOpenLink(id);
  };

  return (
    <div className={style["search-result-container"]}>
      <div className={style["header"]}>
        <h3 className={style["title"]}>Search Results</h3>
      </div>
      <div className={style["content"]}>
        <ul className={style["category-container"]}>
          {categories.map(({ id, label, href, searchParam }) => {
            return (
              <CategoryItem
                key={id}
                id={id}
                handleOpenLink={handleOpenLink}
                openLink={openLink}
                label={label}
                href={href}
                searchParam={searchParam}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const CategoryItem = ({
  id,
  openLink,
  handleOpenLink,
  label,
  href,
  searchParam,
}) => {
  const [urlParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Movies");
  const [count, setCount] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/search/${searchParam}?query=${urlParams.get("query")}`,
        {
          headers: {
            Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setCount(res.data.results.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [urlParams, searchParam]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    handleOpenLink(id);
  };
  return (
    <li
      className={
        selectedCategory === label && openLink === id
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
      <span className={style["count"]}>{count}</span>
    </li>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.number,
  openLink: PropTypes.number,
  handleOpenLink: PropTypes.func,
  label: PropTypes.string,
  href: PropTypes.string,
  searchParam: PropTypes.string,
};

export default SearchResultCategory;
