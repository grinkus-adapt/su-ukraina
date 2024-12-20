import PropTypes from "prop-types";

const ResourceItemPropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subText: PropTypes.string,
  sourceUrl: PropTypes.string.isRequired,
};

const ResourceListModulePropTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string,
  subheadingRich: PropTypes.shape({
    raw: PropTypes.string,
  }),
  resources: PropTypes.arrayOf(PropTypes.shape(ResourceItemPropTypes)),
};

const ResourceListModuleDefaultProps = {
  heading: ``,
  subheadingRich: {
    raw: ``,
  },
};

export {
  ResourceItemPropTypes,
  ResourceListModuleDefaultProps,
  ResourceListModulePropTypes,
};
