import PropTypes from "prop-types";

const seoPropTypes = {
  pageTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ctaPropTypes = {
  id: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export { seoPropTypes, ctaPropTypes };