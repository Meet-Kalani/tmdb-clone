import { createPortal } from "react-dom";
import style from "./play-trailer.module.scss";

const PlayTrailer = ({ handlePlayTrailer, youtubeId }) => createPortal(
  <div className={style.backdrop}>
    <div className={style["play-trailer"]}>
      <div className={style.header}>
        <span className={style.title}>Play Trailer</span>
        <span
          className={style["close-btn"]}
          role="button"
          tabIndex={0}
          onClick={handlePlayTrailer}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handlePlayTrailer();
            }
          }}
        >
          x
        </span>
      </div>
      <div className={style.content}>
        <iframe
          className={style["yt-iframe"]}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&hl=en&modestbranding=1&fs=1&autohide=1`}
          title="Movie Trailer"
          allowFullScreen
        />
      </div>
    </div>
  </div>,
  document.getElementById("portal"),
);

export default PlayTrailer;
