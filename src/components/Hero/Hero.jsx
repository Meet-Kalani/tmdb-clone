import style from "./hero.module.scss";

const Hero = () => {
  return (
    <header className={style["hero"]}>
      <section className={style["welcome-section"]}>
        <div className={style["heading"]}>
          <h2 className={style["title"]}>Welcome.</h2>
          <h3 className={style["description"]}>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <form className={style["search-form"]}>
          <input
            className={style["search-input"]}
            type="text"
            placeholder="Search for a movie, tv show, person......"
            spellCheck="false"
          />
          <button className={style["search-btn"]} type="submit">
            Search
          </button>
        </form>
      </section>
      <section className={style["awards-section"]}>
        <img
          className={style["oscar-text"]}
          src="https://www.themoviedb.org/assets/2/awards-preview/oscars-2024-title-f69161f90ed90871e9fe79439ea7e9280e03f3cb896b8d35d5d37b6711d00913.svg"
          width="300"
          alt="Oscars written as image"
        />
        <button className={style["view-btn"]}>
          View the winners <span className={style["right-arrow"]}></span>
        </button>
      </section>
    </header>
  );
};

export default Hero;
