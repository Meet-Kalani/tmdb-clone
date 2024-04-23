import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import style from "./desktop-navbar.module.scss";
import PropTypes from "prop-types";

const primaryNavlinkData = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Now Playing", href: "#" },
      { id: 3, label: "Upcoming", href: "#" },
      { id: 4, label: "Top Rated", href: "#" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Airing Today", href: "#" },
      { id: 3, label: "On TV", href: "#" },
      { id: 4, label: "Top Rated", href: "#" },
    ],
  },
  {
    id: 3,
    label: "People",
    href: "#",
    nestedLinks: [{ id: 1, label: "Popular People", href: "#" }],
  },
  {
    id: 4,
    label: "More",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Discussions", href: "#" },
      { id: 2, label: "Leaderboard", href: "#" },
      { id: 3, label: "Support", href: "#" },
      { id: 4, label: "API", href: "#" },
    ],
  },
];

const ctaNavlinkData = [
  {
    id: 1,
    label: (
      <img
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg"
        width={22}
      />
    ),
    href: "#",
  },
  { id: 2, label: "EN", href: "#" },
  { id: 3, label: "Login", href: "#" },
  { id: 4, label: "Join TMDB", href: "#" },
  {
    id: 5,
    label: (
      <img
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
        width={29}
      />
    ),
    href: "#",
  },
];

const Navbar = () => {
  const [openNavlink, setOpenNavlink] = useState(0);

  const handleOpenNavlink = (id) => {
    setOpenNavlink(id);
  };

  return (
    <section className={style["desktop-navbar"]}>
      <header className={style["header"]}>
        <nav className={style["navbar"]}>
          <div className={style["primary-navlinks"]}>
            <div className={style["logo-container"]}>
              <Link to="/" className={style["logo"]}>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="The Movie Database (TMDB)"
                  width="154"
                  height="20"
                />
              </Link>
            </div>
            <ul className={style["navlinks"]}>
              {primaryNavlinkData.map(({ id, ...props }) => (
                <NestedNavlinkContainer
                  key={id}
                  id={id}
                  {...props}
                  openNavlink={openNavlink}
                  handleOpenNavlink={handleOpenNavlink}
                />
              ))}
            </ul>
          </div>
          <div className={style["cta-navlinks"]}>
            <ul className={style["navlinks"]}>
              {ctaNavlinkData.map(({ id, label, href }) => (
                <li key={id} className={style["navlink-wrapper"]}>
                  <a
                    href={href}
                    className={
                      id === 2
                        ? `${style["navlink"]} ${style["language-btn"]}`
                        : style["navlink"]
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </section>
  );
};

function NestedNavlinkContainer({
  href,
  label,
  nestedLinks,
  openNavlink,
  handleOpenNavlink,
  id,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (openNavlink !== id) {
      setIsVisible(false);
    }
  }, [id, openNavlink]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNestedNavigationVisibility = () => {
    setIsVisible((previousValue) => {
      return !previousValue;
    });

    handleOpenNavlink(id);
  };

  const tempStyle = {
    width: "max-content",
  };

  return (
    <li className={style["navlink-wrapper"]} ref={navbarRef}>
      <a
        href={href}
        className={style["navlink"]}
        onClick={handleNestedNavigationVisibility}
      >
        {label}
      </a>
      <div className={style["nested-navlinks-wrapper"]}>
        {isVisible && (
          <ul className={style["nested-navlinks"]}>
            {nestedLinks.map(({ id, label, href }) => (
              <li
                key={id}
                className={style["nested-navlink-wrapper"]}
                style={label === "Popular People" ? tempStyle : null}
              >
                <a href={href} className={style["nested-navlink"]}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

NestedNavlinkContainer.propTypes = {
  id: PropTypes.number,
  href: PropTypes.string,
  label: PropTypes.string,
  openNavlink: PropTypes.number,
  handleOpenNavlink: PropTypes.func,
  nestedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default Navbar;
