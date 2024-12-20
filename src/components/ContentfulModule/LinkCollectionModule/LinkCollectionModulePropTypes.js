import PropTypes from "prop-types";

const LinkCollectionModulePropTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  variant: PropTypes.oneOf([`default`, `light-blocks`, `with-image`]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
};

const LinkCollectionModuleDefaultProps = {
  heading: ``,
  subheading: ``,
  variant: `default`,
  fullWidth: false,
};

export { LinkCollectionModulePropTypes, LinkCollectionModuleDefaultProps };
