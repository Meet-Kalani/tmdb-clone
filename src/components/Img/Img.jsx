import PropTypes from "prop-types";

const Img = ({
  alt, src, className,
}) => (
  <img
    alt={alt}
    className={className}
    loading="lazy"
    src={src}
  />
);

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  className: PropTypes.string,
};

Img.defaultProps = {
  className: undefined,
  src: undefined,
};

export default Img;
