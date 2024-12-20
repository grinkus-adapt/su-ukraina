import PropTypes from "prop-types";
import { FaqCategoriesPropType } from "../../Faq/FaqPropTypes";

const FaqCategoriesModulePropTypes = {
  heading: PropTypes.string,
  seeAllLink: PropTypes.string,
  categories: FaqCategoriesPropType.isRequired,
  pathname: PropTypes.string,
  fullWidth: PropTypes.bool,
};

const FaqCategoriesModuleDefaultProps = {
  heading: ``,
  seeAllLink: ``,
  pathname: ``,
  fullWidth: false,
};

export { FaqCategoriesModulePropTypes, FaqCategoriesModuleDefaultProps };
