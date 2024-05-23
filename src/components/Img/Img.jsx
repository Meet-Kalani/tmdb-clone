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
      event.target.src = fallbackImageURL;
    }}
  />
);

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  fallbackImageURL: PropTypes.string,
  className: PropTypes.string,
};

Img.defaultProps = {
  className: undefined,
  src: undefined,
  fallbackImageURL: undefined,
};

export default Img;
