import style from "./result-card.module.scss";

const ResultCard = () => {
  return (
    <div className={`${style["result-card"]} ${style["card"]}`}>
      <img
        className={style["card-image"]}
        src="https://media.themoviedb.org/t/p/w94_and_h141_bestv2/dgqcyTB80gi26UjXTZbyGx5Md2d.jpg"
        alt=""
      />
      <div className={style["card-content"]}>
        <div>
          <a href="#" className={style["card-title-link"]}>
            <h2 className={style["card-title"]}>RANDOM</h2>
          </a>
          <span className={style["release-date"]}>August 16, 2016</span>
        </div>
        <div>
          <p className={style["card-description"]}>
            Trapped in an apartment and before a mystery that disturbs their
            existence, six friends face their demons while secrets of the past
            resurface and masks begin to fall. And if the confinement was just
            the beginning?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
