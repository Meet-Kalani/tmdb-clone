import { useState } from "react";
import style from "./mobile-navbar.module.scss";
import { Link } from "react-router-dom";
import { mobilePrimaryNavlinkData, mobileSecondaryNavlinkData } from "../../constants/constants";
import NestedLink from "./NestedLink/NestedLink";

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
              {mobilePrimaryNavlinkData.map(({ id, ...props }) => {
                return <NestedLink key={id} {...props} />;
              })}
            </ul>
            <ul className={style["secondary-navlinks"]}>
              {mobileSecondaryNavlinkData.map(({ id, label, href }) => {
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

export default MobileNavbar;