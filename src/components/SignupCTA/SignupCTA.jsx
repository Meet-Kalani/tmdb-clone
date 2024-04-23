import style from "./signup-cta.module.scss";
import AnchorButton from "../AnchorButton/AnchorButton";

const SignupCTA = () => {
  return (
    <section className={style["signup_cta"]}>
      <div className={style["signup_cta-wrapper"]}>
        <div className={style["signup_cta-header"]}>
          <h2 className={style["signup_cta-title"]}>Join Today</h2>
        </div>
        <div className={style["signup_cta-content"]}>
          <div className={style["signup_cta-info"]}>
            <p className={style["signup_cta-description"]}>
              Get access to maintain your own{" "}
              <em className={style["signup_cta-emphasized"]}>
                custom personal lists
              </em>
              ,
              <em className={style["signup_cta-emphasized"]}>
                track what you&#39;ve seen
              </em>
              and search and filter for
              <em className={style["signup_cta-emphasized"]}>
                what to watch next
              </em>
              —regardless if it&#39;s in theatres, on TV or available on popular
              streaming services like Netflix, Amazon Prime Video, Disney Plus,
              Apple TV Plus, and Hulu.
            </p>
            <AnchorButton className={style["signup_cta-btn"]} hyperlink="#">
              Sign Up
            </AnchorButton>
          </div>
          <div className={style["signup_cta-benefits"]}>
            <ul className={style["signup_cta-list"]}>
              <li className={style["signup_cta-benefit"]}>
                Enjoy TMDB ad free
              </li>
              <li className={style["signup_cta-benefit"]}>
                Maintain a personal watchlist
              </li>
              <li className={style["signup_cta-benefit"]}>
                Filter by your subscribed streaming services and find something
                to watch
              </li>
              <li className={style["signup_cta-benefit"]}>
                Log the movies and TV shows you&#39;ve seen
              </li>
              <li className={style["signup_cta-benefit"]}>
                Build custom lists
              </li>
              <li className={style["signup_cta-benefit"]}>
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
