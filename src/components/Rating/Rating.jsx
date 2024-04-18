import { CircularProgress } from "@mui/material";
import style from "./rating.module.scss"
import PropTypes from 'prop-types'

const Rating = ({ rating }) => {
    return (
        <div className={style["rating-container"]}>
            <div>
                <CircularProgress
                    variant="determinate"
                    className={style["rating-progressbar"]}
                    value={rating}
                    size={60}
                />
                <span className={style["rating-count"]}>
                    {rating}
                    <span className={style["percentage-sign"]}>%</span>{" "}
                </span>
            </div>
        </div>
    )
};

Rating.propTypes = {
    rating: PropTypes.number
}

export default Rating;
