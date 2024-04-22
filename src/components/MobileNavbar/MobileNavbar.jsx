import { useState } from "react";
import PropTypes from "prop-types";
import style from "./mobile-navbar.module.scss";
import { Link } from "react-router-dom";

const primaryNavlinkData = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Top Rated", href: "#" },
      { id: 3, label: "Upcoming", href: "#" },
      { id: 4, label: "Now Playing", href: "#" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Top Rated", href: "#" },
      { id: 3, label: "On TV", href: "#" },
      { id: 4, label: "Airing Today", href: "#" },
    ],
  },
  {
    id: 3,
    label: "People",
    href: "#",
    nestedLinks: [{ id: 1, label: "Popular People", href: "#" }],
  },
];

const secondaryNavlinkData = [
  { id: 1, label: "Contribution Bible", href: "#" },
  { id: 2, label: "Discussions", href: "#" },
  { id: 3, label: "Leaderboard", href: "#" },
  { id: 4, label: "API", href: "#" },
  { id: 5, label: "Support", href: "#" },
  { id: 6, label: "About", href: "#" },
];

const MobileNavbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarVisibility = () => {
    setIsSidebarVisible((previousValue) => {
      return !previousValue;
    });
  };

  return (
    <section className={style["mobile-navbar"]}>
      <header className={style["header"]}>
        <nav className={style["navbar"]}>
          <div className={style["wrapper"]}>
            <div className={style["menu-icon-wrapper"]}>
              <a
                href="#"
                className={style["menu-icon"]}
                onClick={handleSidebarVisibility}
              ></a>
            </div>
          </div>
          <div className={style["wrapper"]}>
            <div className={style["logo-wrapper"]}>
              <Link to="/" className={style["logo"]}>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
          <div className={style["wrapper"]}>
            <div className={style["action-icon-wrapper"]}>
              <a href="#" className={style["user-icon"]}></a>
              <a href="#" className={style["search-icon"]}></a>
            </div>
          </div>
        </nav>
      </header>
      {isSidebarVisible && (
        <aside className={style["sidebar"]}>
          <div className={style["wrapper"]}>
            <ul className={style["primary-navlinks"]}>
              {primaryNavlinkData.map(({ id, ...props }) => {
                return <SidebarNavigation key={id} {...props} />;
              })}
            </ul>
            <ul className={style["secondary-navlinks"]}>
              {secondaryNavlinkData.map(({ id, label, href }) => {
                return (
                  <li key={id} className={style["navlink-wrapper"]}>
                    <a href={href} className={style["navlink"]}>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul className={style["login-navlink"]}>
              <li className={style["navlink-wrapper"]}>
                <a href="#" className={style["navlink"]}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </section>
  );
};

function SidebarNavigation({ label, href, nestedLinks }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleNestedNavigationVisibility = () => {
    setIsVisible((previousValue) => {
      return !previousValue;
    });
  };

  return (
    <li className={style["navlink-wrapper"]}>
      <a
        href={href}
        className={style["navlink"]}
        onClick={handleNestedNavigationVisibility}
      >
        {label}
      </a>
      {isVisible && (
        <ul className={style["nested-navlinks"]}>
          {nestedLinks.map(({ id, label, href }) => {
            return (
              <li key={id} className={style["nested-navlink-wrapper"]}>
                <a href={href} className={style["nested-navlink"]}>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

SidebarNavigation.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default MobileNavbar;
