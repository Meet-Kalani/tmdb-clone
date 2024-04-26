import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import style from "./not-found.module.scss";

const NotFound = () => {
  useTitle('Page Not Found — The Movie Database (TMDB)');
  return (
    <div className={style['not-found']}>
      <div className={style.wrapper}>
        <div className={style['error-wrapper']}>
          <h2 className={style.title}>Oops! We can&#39;t find the page you&#39;re looking for</h2>
        </div>
        <p className={style.description}>
          You tried to request a page that doesn&#39;t exist. If you believe this
          to be in error, let us know
          {' '}
          <Link className={style.link} to="/">on the forums</Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
