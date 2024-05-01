import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useTitle from "../../hooks/useTitle";
import style from "./error-page.module.scss";

const NotFound = () => {
  useTitle('Something went wrong!');
  return (
    <div className={style['error-page']}>
      <div className={style.wrapper}>
        <div className={style['title-wrapper']}>
          <h2 className={style.title}>Oops! Something Went Wrong</h2>
        </div>
        <p className={style.description}>
          We&#39;re sorry, but it seems like an unexpected error has occurred. Our team has been notified, and we&#39;re working to fix the issue as soon as possible. In the meantime, you can try refreshing the page or come back later. We apologize for any inconvenience this may have caused.
        </p>
        <div className={style.navlink}>
          <FiArrowLeft />
          <Link to="/">
            get back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
