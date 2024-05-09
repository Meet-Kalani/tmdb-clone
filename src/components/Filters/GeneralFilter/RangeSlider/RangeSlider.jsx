import { Slider } from "@mui/material";
import PropTypes from "prop-types";
import style from "./range-slider.module.scss";
import Filter from "../Filter/Filter";

const RangeSlider = ({
  marks, max, min, step, value, handleOnChange, title,
}) => {
  const sliderStyle = {
    '& .MuiSlider-thumb': {
      width: 14,
      height: 14,
    },
  };

  const valueLabelFormat = () => {
    const [gte, lte] = value;
    return `Rated ${gte}-${lte}`;
  };

  return (
    <Filter title={title}>
      <Slider
        className={style['range-slider']}
        marks={marks}
        max={max}
        min={min}
        step={step}
        sx={sliderStyle}
        value={value}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        onChange={handleOnChange}
      />
    </Filter>
  );
};

RangeSlider.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.number).isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default RangeSlider;
