import React from "react";
import classNames from "classnames";

import { FaqNav } from "../../Faq";
import Section from "../../Section";
import Constraint from "../../Constraint";
import Link from "../../Link";
import Icon from "../../Icon";

import { getTranslatedText } from "../../../utils/getTranslatedText";
import "./FaqCategoriesModule.css";
import { graphql } from "gatsby";

import "./FaqCategoriesModule.css";
import {
  FaqCategoriesModuleDefaultProps,
  FaqCategoriesModulePropTypes,
} from "./FaqCategoriesModulePropTypes";

const FaqCategoriesModule = ({
  heading,
  seeAllLink,
  categories,
  pathname,
  fullWidth,
}) => {
  return (
    <Section className="FaqCategoriesModule">
      <Constraint
        className={classNames({ "Constraint--full-width": fullWidth })}
      >
        {heading && <h2>{heading}</h2>}
        <FaqNav
          rootPath={seeAllLink}
          categories={categories}
          pathname={pathname}
        />
        {seeAllLink && (
          <Link className="FaqCategoriesModule__see-all" to={seeAllLink}>
            <span className="FaqCategoriesModule__see-all-text">
              {getTranslatedText(`actions.seeAll`)}
            </span>
            {` `}
            <Icon type="arrow-blue" />
          </Link>
        )}
      </Constraint>
    </Section>
  );
};

FaqCategoriesModule.propTypes = FaqCategoriesModulePropTypes;

FaqCategoriesModule.defaultProps = FaqCategoriesModuleDefaultProps;

export default FaqCategoriesModule;

export const query = graphql`
  fragment FaqCategoriesFragment on ContentfulFaqCategoriesModule {
    heading
    seeAllLink
    categories {
      id
      slug
      pageHeading
      iconType
    }
    fullWidth
  }
`;
