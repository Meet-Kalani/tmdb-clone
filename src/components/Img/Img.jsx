import PropTypes from "prop-types";

const Img = ({
  alt, src, fallbackImageURL, className,
}) => (
  <img
    alt={alt}
    className={className}
    loading="lazy"
    src={src}
    onError={(event) => {
      event.target.src = { fallbackImageURL };
    }}
  />
);

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  fallbackImageURL: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Img.defaultProps = {
  className: undefined,
};

export default Img;
