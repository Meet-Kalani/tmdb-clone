import style from "./signup-cta.module.scss";
import AnchorButton from "../AnchorButton/AnchorButton";

const SignupCTA = () => {
  return (
    <section className={style["signup-cta__container"]}>
      <div className={style["signup-cta__wrapper"]}>
        <div className={style["signup-cta__header"]}>
          <h2 className={style["signup-cta__title"]}>Join Today</h2>
        </div>
        <div className={style["signup-cta__content"]}>
          <div className={style["signup-cta__info"]}>
            <p className={style["signup-cta__description"]}>
              Get access to maintain your own{" "}
              <em className={style["signup-cta__emphasized"]}>
                custom personal lists
              </em>
              ,
              <em className={style["signup-cta__emphasized"]}>
                track what you&#39;ve seen
              </em>{" "}
              and search and filter for
              <em className={style["signup-cta__emphasized"]}>
                what to watch next
              </em>
              —regardless if it&#39;s in theatres, on TV or available on popular
              streaming services like Netflix, Amazon Prime Video, Disney Plus,
              Apple TV Plus, and Hulu.
            </p>
            <AnchorButton className={style["signup-cta__btn"]} hyperlink="#">
              Sign Up
            </AnchorButton>
          </div>
          <div className={style["signup-cta__benefits"]}>
            <ul className={style["signup-cta__list"]}>
              <li className={style["signup-cta__benefit"]}>
                Enjoy TMDB ad free
              </li>
              <li className={style["signup-cta__benefit"]}>
                Maintain a personal watchlist
              </li>
              <li className={style["signup-cta__benefit"]}>
                Filter by your subscribed streaming services and find something
                to watch
              </li>
              <li className={style["signup-cta__benefit"]}>
                Log the movies and TV shows you&#39;ve seen
              </li>
              <li className={style["signup-cta__benefit"]}>
                Build custom lists
              </li>
              <li className={style["signup-cta__benefit"]}>
                Contribute to and improve our database
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupCTA;
