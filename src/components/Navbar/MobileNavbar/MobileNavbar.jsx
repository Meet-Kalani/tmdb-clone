import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./mobile-navbar.module.scss";
import { MOBILE_PRIMARY_NAVLINK_DATA, MOBILE_SECONDARY_NAVLINK_DATA } from "../../../constants/mobileNavbarLinks";
import NestedLink from "./NestedLink/NestedLink";

const MobileNavbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((previousValue) => !previousValue);
  };

  return (
    <section className={style["mobile-navbar"]}>
      <header className={style.header}>
        <nav className={style.navbar}>
          <div className={style.wrapper}>
            <button
              className={style["menu-icon-wrapper"]}
              type="button"
              onClick={toggleSidebarVisibility}
            >
              <img alt="menu icon" className={style["menu-icon"]} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-600-menu-7ef6e3f4266b4b216a8ef5920da43fc8c96e1ee805a219c5628fed5bfac854d5.svg" />
            </button>
          </div>
          <div className={style.wrapper}>
            <div className={style["logo-wrapper"]}>
              <Link className={style.logo} to="/">
                <img
                  alt="Logo"
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                />
              </Link>
            </div>
          </div>
          <div className={style.wrapper}>
            <div className={style["action-icon-wrapper"]}>
              <img alt="user icon" className={style["user-icon"]} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg" />
              <img alt="search icon" className={style["search-icon"]} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" />
            </div>
          </div>
        </nav>
      </header>
      {isSidebarVisible ? (
        <aside className={style.sidebar}>
          <div className={style.wrapper}>
            <ul className={style["primary-navlinks"]}>
              {MOBILE_PRIMARY_NAVLINK_DATA.map(({
                id, label, href, nestedLinks,
              }) => <NestedLink href={href} key={id} label={label} nestedLinks={nestedLinks} />)}
            </ul>
            <ul className={style["secondary-navlinks"]}>
              {MOBILE_SECONDARY_NAVLINK_DATA.map(({ id, label, href }) => (
                <li className={style["navlink-wrapper"]} key={id}>
                  <a className={style.navlink} href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className={style["login-navlink"]}>
              <li className={style["navlink-wrapper"]}>
                <a className={style.navlink} href="/">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </aside>
      ) : null}
    </section>
  );
};

export default MobileNavbar;
