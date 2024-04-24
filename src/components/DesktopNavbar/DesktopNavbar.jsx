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
              {desktopPrimaryNavlinkData.map(({ id, ...props }) => (
                <NestedLink
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
              {desktopCTANavlinkData.map(({ id, label, href }) => (
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

export default Navbar;
