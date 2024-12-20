import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { HeroSection } from "../components/HeroSection";
import NavigationGroup from "../components/NavigationGroup";
import Constraint from "../components/Constraint";
import { FaqNav } from "../components/Faq";

import { formatRichText } from "../helpers/formatting";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { FaqCategoriesPropType } from "../components/Faq/FaqPropTypes";
import {
  LinkCollectionModule,
  LinkCollectionModulePropTypes,
  LinkCollectionModuleDefaultProps,
} from "../components/ContentfulModule/LinkCollectionModule";
import { graphql } from "gatsby";

const FaqIndexPage = ({ data, path, pageContext }) => {
  const {
    locale,
    rootPath,
    breadcrumb: { crumbs },
  } = pageContext;
  const {
    contentfulNavigation: navigation,
    contentfulPromoLineModule: promoLine,
    contentfulLinkCollectionModule: personalizedGuidesLinks,
    contentfulFaqPage: {
      metaTitle,
      metaDescription,
      heroImage,
      pageHeading,
      pageDescription,
      categories,
    },
  } = data;

  return (
    <Layout
      pagePath={path}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={navigation}
      locale={locale}
      promoLine={promoLine}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Constraint>
        <NavigationGroup crumbs={crumbs} />
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      {categories?.at(0) && (
        <Constraint>
          <FaqNav rootPath={rootPath} categories={categories} pathname={path} />
        </Constraint>
      )}

      {personalizedGuidesLinks && (
        <LinkCollectionModule
          {...personalizedGuidesLinks}
          className="LcmLightBlocks--with-padding"
        />
      )}
    </Layout>
  );
};

FaqIndexPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.arrayOf(
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          crumbLabel: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    locale: localePropType.isRequired,
    rootPath: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulFaqPage: PropTypes.shape({
      metaTitle: PropTypes.string.isRequired,
      metaDescription: PropTypes.string.isRequired,
      heroImage: gatsbyImagePropType,
      pageHeading: PropTypes.string,
      pageDescription: PropTypes.shape({
        raw: PropTypes.string,
      }),
      categories: FaqCategoriesPropType,
    }),
    contentfulLinkCollectionModule: PropTypes.shape(
      LinkCollectionModulePropTypes
    ),
  }),
};

FaqIndexPage.defaultProps = {
  pageTitle: ``,
  pageDescription: {
    raw: ``,
  },
  organisations: [],
  navData: [],
  contentfulLinkCollectionModule: LinkCollectionModuleDefaultProps,
};

export default FaqIndexPage;

export const faqIndexPageQuery = graphql`
  query (
    $id: String
    $navigationId: String
    $locale: String
    $promoLineId: String
    $node_locale: String
  ) {
    # Global Navigation
    contentfulNavigation(
      contentful_id: { eq: $navigationId }
      node_locale: { eq: $locale }
    ) {
      ...NavigationFragment
    }

    # Global Promo Line
    contentfulPromoLineModule(
      contentful_id: { eq: $promoLineId }
      node_locale: { eq: $locale }
    ) {
      ...PromoLineFragment
    }

    contentfulLinkCollectionModule(
      contentful_id: { eq: "1JYPNg9dcfazxccUEpijxk" }
    ) {
      id
      ...LinkCollectionModuleFragment
    }

    # Faq Page (all categories for faq nav)
    contentfulFaqPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $node_locale }
    ) {
      metaTitle
      metaDescription
      pageHeading
      pageDescription {
        raw
      }
      heroImage {
        gatsbyImageData(
          width: 1440
          height: 148
          placeholder: BLURRED
          formats: WEBP
          layout: FULL_WIDTH
        )
      }
      categories {
        ... on ContentfulFaqCategory {
          id
          slug
          pageHeading
          iconType
        }
      }
    }
  }
`;
