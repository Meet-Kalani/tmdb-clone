import AnchorButton from "../AnchorButton/AnchorButton";
import Navlinks from "./Navlinks/Navlinks";
import style from "./footer.module.scss";

const data = [
  {
    id: 1,
    label: "The Basics",
    hyperlinks: [
      { id: 1, label: "About TMDB", link: "#" },
      { id: 2, label: "Contact Us", link: "#" },
      { id: 3, label: "Support Forums", link: "#" },
      { id: 4, label: "API", link: "#" },
      { id: 5, label: "System Status", link: "#" },
    ],
  },
  {
    id: 2,
    label: "Get Involved",
    hyperlinks: [
      { id: 1, label: "Contribution Bible", link: "#" },
      { id: 2, label: "Add New Movie", link: "#" },
      { id: 3, label: "Add New TV Show", link: "#" },
    ],
  },
  {
    id: 3,
    label: "Community",
    hyperlinks: [
      { id: 1, label: "Guidelines", link: "#" },
      { id: 2, label: "Discussions", link: "#" },
      { id: 3, label: "Leaderboard", link: "#" },
    ],
  },
  {
    id: 4,
    label: "Legal",
    hyperlinks: [
      { id: 1, label: "Terms of Use", link: "#" },
      { id: 2, label: "API Terms of Use", link: "#" },
      { id: 3, label: "Privacy Policy", link: "#" },
      { id: 4, label: "DMCA Policy", link: "#" },
    ],
  },
];

const Footer = () => (
  <footer className={style.footer}>
    <nav className={style["footer-navbar"]}>
      <div className={style["logo-container"]}>
        <img
          alt="tmdb logo"
          className={style.logo}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        />
        <AnchorButton
          className={style["join-community-btn"]}
          hyperlink="https://www.themoviedb.org/signup"
        >
          join the community
        </AnchorButton>
      </div>
      {data.map(({ id, label, hyperlinks }) => (
        <Navlinks data={hyperlinks} key={id} label={label} />
      ))}
    </nav>
    <div className={style["build-info"]}>Build 3cd194b (7025)</div>
  </footer>
);

export default Footer;
