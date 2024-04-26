import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./desktop-navbar.module.scss";
import {
  desktopCTANavlinkData,
  desktopPrimaryNavlinkData,
} from "../../constants/constants";
import NestedLink from "./NestedLink/NestedLink";

const Navbar = () => {
  const [openNavlink, setOpenNavlink] = useState(0);

  const handleOpenNavlink = (id) => {
    setOpenNavlink(id);
  };

  return (
    <section className={style["desktop-navbar"]}>
      <header className={style.header}>
        <nav className={style.navbar}>
          <div className={style["primary-navlinks"]}>
            <div className={style["logo-container"]}>
              <Link className={style.logo} to="/">
                <img
                  alt="The Movie Database (TMDB)"
                  height="20"
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  width="154"
                />
              </Link>
            </div>
            <ul className={style.navlinks}>
              {desktopPrimaryNavlinkData.map(({
                id, href, label, nestedLinks,
              }) => (
                <NestedLink
                  handleOpenNavlink={handleOpenNavlink}
                  href={href}
                  id={id}
                  key={id}
                  label={label}
                  nestedLinks={nestedLinks}
                  openNavlink={openNavlink}
                />
              ))}
            </ul>
          </div>
          <div className={style["cta-navlinks"]}>
            <ul className={style.navlinks}>
              {desktopCTANavlinkData.map(({ id, label, href }) => (
                <li className={style["navlink-wrapper"]} key={id}>
                  <a
                    href={href}
                    className={
                      id === 2
                        ? `${style.navlink} ${style["language-btn"]}`
                        : style.navlink
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

export default Navbar;
