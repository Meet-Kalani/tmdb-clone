import Button from "../Button/Button";
import style from "./footer.module.scss"

const Footer = () => {
  return (
    <footer className={style['footer']}>
      <nav className={style['footer-navbar']}>
        <div className={style['logo-container']}>
          <img className={style['logo']} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb logo" />
          <Button className={style['join-community-btn']} label={"join the community"} hyperlink={"https://www.themoviedb.org/signup"} />
        </div>
        <div className={style['footer-navlinks']}>
          <h3 className={style['footer-navlinks-title']}>The Basics</h3>
          <ul className={style['footer-navlinks-list']}>
            <li><a href="#" className={style['footer-navlink']}>About TMDB</a></li>
            <li><a href="#" className={style['footer-navlink']}>Contact Us</a></li>
            <li><a href="#" className={style['footer-navlink']}>Support Forums</a></li>
            <li><a href="#" className={style['footer-navlink']}>API</a></li>
            <li><a href="#" className={style['footer-navlink']}>System Status</a></li>
          </ul>
        </div>
        <div className={style['footer-navlinks']}>
          <h3 className={style['footer-navlinks-title']}>Get Involved</h3>
          <ul className={style['footer-navlinks-list']}>
            <li><a href="#" className={style['footer-navlink']}>Contribution Bible</a></li>
            <li><a href="#" className={style['footer-navlink']}>Add New Movie</a></li>
            <li><a href="#" className={style['footer-navlink']}>Add New TV Show</a></li>
          </ul>
        </div>
        <div className={style['footer-navlinks']}>
          <h3 className={style['footer-navlinks-title']}>Community</h3>
          <ul className={style['footer-navlinks-list']}>
            <li><a href="#" className={style['footer-navlink']}>Guidelines</a></li>
            <li><a href="#" className={style['footer-navlink']}>Discussions</a></li>
            <li><a href="#" className={style['footer-navlink']}>Leaderboard</a></li>
          </ul>
        </div>
        <div className={style['footer-navlinks']}>
          <h3 className={style['footer-navlinks-title']}>Legal</h3>
          <ul className={style['footer-navlinks-list']}>
            <li><a href="#" className={style['footer-navlink']}>Terms of Use</a></li>
            <li><a href="#" className={style['footer-navlink']}>API Terms of Use</a></li>
            <li><a href="#" className={style['footer-navlink']}>Privacy Policy</a></li>
            <li><a href="#" className={style['footer-navlink']}>DMCA Policy</a></li>
          </ul>
        </div>
      </nav>
      <div className={style['build-info']}>Build 3cd194b (7025)</div>
    </footer>
  )
};

export default Footer;
