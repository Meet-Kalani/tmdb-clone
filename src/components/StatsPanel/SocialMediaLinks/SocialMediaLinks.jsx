import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./social-media-links.module.scss";
import {
  FACEBOOK_ICON, INSTAGRAM_ICON, LINK_ICON, TWITTER_ICON,
} from "../../../constants/constants";
import Img from "../../Img/Img";

const SocialMediaLinks = ({
  homepageLink,
  socialMediaLinks,
}) => (
  <div className={style["social-media-links"]}>
    <Link
      className={style['social-media-icon']}
      to={`https://www.facebook.com/${encodeURIComponent(socialMediaLinks.facebook_id)}`}
    >
      <Img
        alt="facebook icon"
        src={FACEBOOK_ICON}
      />
    </Link>
    <Link
      className={`${style['twitter-icon']} ${style['social-media-icon']}`}
      to={`https://www.twitter.com/${encodeURIComponent(socialMediaLinks.twitter_id)}`}
    >
      <Img
        alt="twitter icon"
        src={TWITTER_ICON}
      />
    </Link>
    <Link
      to={`https://www.instagram.com/${encodeURIComponent(socialMediaLinks.instagram_id)}`}
      className={`${style['instagram-icon']} 
      ${style['social-media-icon']}`}
    >
      <Img
        alt="instagram icon"
        src={INSTAGRAM_ICON}
      />
    </Link>
    <div className={style.divider} />
    <Link
      to={homepageLink}
      className={`${style['homepage-icon']}
       ${style['social-media-icon']}`}
    >
      <Img
        alt="link icon"
        src={LINK_ICON}
      />
    </Link>
  </div>
);

SocialMediaLinks.propTypes = {
  homepageLink: PropTypes.string.isRequired,
  socialMediaLinks: PropTypes.shape({
    facebook_id: PropTypes.string,
    instagram_id: PropTypes.string,
    twitter_id: PropTypes.string,
  }).isRequired,
};

export default SocialMediaLinks;
