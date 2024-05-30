import { Link } from "react-router-dom";
import clsx from 'clsx';
import style from "./desktop-navbar.module.scss";
import {
  DESKTOP_CTA_NAVLINK_DATA,
  DESKTOP_PRIMARY_NAVLINK_DATA,
} from "../../../constants/desktopNavbarLinks";
import NestedLink from "./NestedLink/NestedLink";

const Navbar = () => (
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
            {DESKTOP_PRIMARY_NAVLINK_DATA.map(({
              id, href, label, nestedLinks,
            }) => (
              <NestedLink
                href={href}
                key={id}
                label={label}
                nestedLinks={nestedLinks}
              />
            ))}
          </ul>
        </div>
        <div className={style["cta-navlinks"]}>
          <ul className={style.navlinks}>
            {DESKTOP_CTA_NAVLINK_DATA.map(({ id, label, href }) => (
              <li className={style["navlink-wrapper"]} key={id}>
                <a
                  href={href}
                  className={clsx(
                    style.navlink,
                    id === 2 && style["language-btn"],
                  )}
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

export default Navbar;
