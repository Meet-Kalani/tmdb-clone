import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import style from "./navbar.module.scss";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const classNameForWrapper = visible
    ? `${style["slideIn"]} ${style["navbar-wrapper"]}`
    : `${style["slideOut"]} ${style["navbar-wrapper"]}`;

  return (
    <>
      <div className={classNameForWrapper}>
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
