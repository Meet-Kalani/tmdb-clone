import { Slider } from "@mui/material";
import PropTypes from "prop-types";
import style from "./range-slider.module.scss";
import FilterWrapper from "../FilterWrapper/FilterWrapper";

const RangeSlider = ({
  marks, max, min, step, value, handleOnChange, title, tooltipFormat,
}) => {
  const sliderStyle = {
    '& .MuiSlider-thumb': {
      width: 14,
      height: 14,
    },
  };

  const valueArray = value.lte ? [value.gte, value.lte] : [value.gte];

  return (
    <FilterWrapper title={title}>
      <Slider
        className={style['range-slider']}
        marks={marks}
        max={max}
        min={min}
        step={step}
        sx={sliderStyle}
        value={valueArray}
        valueLabelDisplay="auto"
        valueLabelFormat={tooltipFormat(value)}
        onChange={handleOnChange}
      />
    </FilterWrapper>
  );
};

RangeSlider.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  // eslint-disable-next-line
  value: PropTypes.shape({ lte: PropTypes.number, gte: PropTypes.number }),
  handleOnChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tooltipFormat: PropTypes.func.isRequired,
};

export default RangeSlider;
