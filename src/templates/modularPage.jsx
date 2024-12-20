import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import Constraint from "../components/Constraint";
import NavigationGroup from "../components/NavigationGroup";
import { HeroSection } from "../components/HeroSection";
import {
  ContentfulModule,
  ContentfulModulePropTypes,
} from "../components/ContentfulModule";
import SlidingNavigation from "../components/SlidingNavigation";

import { formatRichText } from "../helpers/formatting";
import {
  gatsbyImagePropType,
  localePropType,
  navigationPropTypes,
  nodeSlugsPropTypes,
  promoLinePropTypes,
} from "../helpers/genericPropTypes";
import { graphql } from "gatsby";
import { getSlidingNavData } from "../build-utils/helpers/hooks";

const ModularPage = ({ data, path, pageContext }) => {
  const {
    locale,
    currentNodeSlugs,
    breadcrumb: { crumbs },
  } = pageContext;
  const {
    contentfulNavigation,
    contentfulPromoLineModule,
    contentfulModularPage: {
      pageHeading,
      metaTitle,
      metaDescription,
      heroImage,
      pageDescription,
      modules,
      includeContactForm,
      showBreadcrumbs,
      stickyHeader,
    },
  } = data;

  const slidingNavData = getSlidingNavData(modules);
  // in some cases you want to add extra props to a module
  // this function does exactly that
  const supplementModule = (module) => {
    const type = module?.internal?.type;
    if (type === `ContentfulFaqNavigation`) {
      return {
        ...module,
        pathname: path,
      };
    }

    if (type === `ContentfulEventsModule`) {
      return {
        ...module,
        locale,
      };
    }

    return module;
  };

  return (
    <Layout
      pagePath={path}
      includeContactForm={includeContactForm}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      navigation={contentfulNavigation}
      currentNodeSlugs={currentNodeSlugs}
      locale={locale}
      stickyHeader={stickyHeader}
      promoLine={contentfulPromoLineModule}
    >
      {heroImage && <HeroSection heroImage={heroImage} />}

      <Constraint>
        {showBreadcrumbs && <NavigationGroup crumbs={crumbs} />}
        {pageHeading && <h1>{pageHeading}</h1>}
        {pageDescription?.raw && formatRichText(pageDescription.raw)}
      </Constraint>

      {slidingNavData && (
        <Constraint className="Constraint--sliding-nav">
          <SlidingNavigation data={slidingNavData} />
        </Constraint>
      )}
      {!!modules?.at(0) &&
        modules.map((module) => {
          return (
            <ContentfulModule
              key={module.id}
              module={supplementModule(module)}
              pathname={path}
            />
          );
        })}
    </Layout>
  );
};

ModularPage.propTypes = {
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
    currentNodeSlugs: nodeSlugsPropTypes.isRequired,
  }),
  data: PropTypes.shape({
    contentfulNavigation: navigationPropTypes.isRequired,
    contentfulPromoLineModule: promoLinePropTypes,
    contentfulModularPage: PropTypes.shape({
      metaTitle: PropTypes.string.isRequired,
      metaDescription: PropTypes.string.isRequired,
      heroImage: gatsbyImagePropType,
      pageHeading: PropTypes.string,
      pageDescription: PropTypes.shape({
        raw: PropTypes.string,
      }),
      modules: PropTypes.arrayOf(ContentfulModulePropTypes),
      includeContactForm: PropTypes.bool,
      fullWidthModules: PropTypes.bool,
      showBreadcrumbs: PropTypes.bool,
      stickyHeader: PropTypes.bool,
    }),
  }),
};

ModularPage.defaultProps = {
  data: {
    contentfulModularPage: {
      pageTitle: ``,
      pageDescription: {
        raw: ``,
      },
      organisations: [],
      includeContactForm: true,
      fullWidthModules: false,
      showBreadcrumbs: true,
      stickyHeader: true,
    },
  },
};

export default ModularPage;

export const modularPageQuery = graphql`
  query (
    $id: String
    $navigationId: String
    $locale: String
    $promoLineId: String
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

    # Modular Page
    contentfulModularPage(
      contentful_id: { eq: $id }
      node_locale: { eq: $locale }
    ) {
      metaTitle
      metaDescription
      heroImage {
        gatsbyImageData(
          width: 1440
          height: 148
          placeholder: BLURRED
          formats: WEBP
          layout: FULL_WIDTH
        )
      }
      pageHeading
      pageDescription {
        raw
      }
      modules {
        ... on Node {
          id
          internal {
            type
          }
          ...EventsModuleFragment
          ...SlidingNavBlockFragment
          ...ResourceListModuleFragment
          ...LinkCollectionModuleFragment
          ...HelpSearchFragment
          ...StepsModuleFragment
        }
      }
      includeContactForm
      fullWidthModules
      showBreadcrumbs
      stickyHeader
    }
  }
`;
