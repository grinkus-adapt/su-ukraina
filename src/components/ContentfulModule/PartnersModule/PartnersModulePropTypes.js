import PropTypes from "prop-types";
import { gatsbyImagePropType } from "../../../helpers/genericPropTypes";

const PartnerPropTypes = {
  label: PropTypes.string,
  logo: gatsbyImagePropType,
  url: PropTypes.string,
};

const PartnersModulePropTypes = {
  heading: PropTypes.string.isRequired,
  partnerCollections: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      partners: PropTypes.arrayOf(PropTypes.shape(PartnerPropTypes)),
    })
  ),
  fullWidth: PropTypes.bool,
};

const PartnersModuleDefaultProps = {
  partnerCollections: [],
  fullWidth: false,
};

export {
  PartnerPropTypes,
  PartnersModuleDefaultProps,
  PartnersModulePropTypes,
};
