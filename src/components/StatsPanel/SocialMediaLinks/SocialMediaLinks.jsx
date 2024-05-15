import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchSocialMediaLinks } from "../../../service/api";
import style from "./social-media-links.module.scss";
import {
  FACEBOOK_ICON, INSTAGRAM_ICON, LINK_ICON, TWITTER_ICON,
} from "../../../constants/constants";
import { notifyError } from "../../../utils/helpers";
import Img from "../../Img/Img";

const SocialMediaLinks = ({
  id, contentType, homepageLink,
}) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSocialMediaLinks(id, contentType);
        setSocialMediaLinks(res);
      }
      catch (err) {
        notifyError(err);
      }
    })();
  }, [id, contentType]);

  return (
    <div className={style["social-media-links"]}>
      <Link
        className={style['social-media-icon']}
        to={`https://www.facebook.com/${encodeURIComponent(socialMediaLinks.facebook_id)}`}
      >
        <Img alt="facebook icon" fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/30x30.png?text=!" src={FACEBOOK_ICON} />
      </Link>
      <Link
        className={`${style['twitter-icon']} ${style['social-media-icon']}`}
        to={`https://www.twitter.com/${encodeURIComponent(socialMediaLinks.twitter_id)}`}
      >
        <Img alt="twitter icon" fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/30x30.png?text=!" src={TWITTER_ICON} />
      </Link>
      <Link
        to={`https://www.instagram.com/${encodeURIComponent(socialMediaLinks.instagram_id)}`}
        className={`${style['instagram-icon']} 
      ${style['social-media-icon']}`}
      >
        <Img alt="instagram icon" fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/30x30.png?text=!" src={INSTAGRAM_ICON} />
      </Link>
      <div className={style.divider} />
      <Link
        to={homepageLink}
        className={`${style['homepage-icon']}
       ${style['social-media-icon']}`}
      >
        <Img alt="link icon" fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/30x30.png?text=!" src={LINK_ICON} />
      </Link>
    </div>
  );
};

SocialMediaLinks.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  homepageLink: PropTypes.string.isRequired,
};

export default SocialMediaLinks;
