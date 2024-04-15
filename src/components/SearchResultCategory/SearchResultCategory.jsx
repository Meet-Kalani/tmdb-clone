import { useState } from "react";
import style from "./search-result-category.module.scss";

const categories = [
  {
    id: 1,
    label: "TVShows",
    href: "#",
    count: 23,
  },
  {
    id: 2,
    label: "Movies",
    href: "#",
    count: 103,
  },
  {
    id: 3,
    label: "People",
    href: "#",
    count: 27,
  },
  {
    id: 4,
    label: "Companies",
    href: "#",
    count: 33,
  },
  {
    id: 5,
    label: "Keywords",
    href: "#",
    count: 2,
  },
  {
    id: 6,
    label: "Collections",
    href: "#",
    count: 0,
  },
  {
    id: 7,
    label: "Networks",
    href: "#",
    count: 0,
  },
];

const SearchResultCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={style["search-result-container"]}>
      <div className={style["header"]}>
        <h3 className={style["title"]}>Search Results</h3>
      </div>
      <div className={style["content"]}>
        <ul className={style["category-container"]}>
          {categories.map(({ id, label, href, count }) => {
            return (
              <li
                key={id}
                className={
                  selectedCategory === label
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
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchResultCategory;
