import React from "react";
import PropTypes from "prop-types";

import ContentfulModulePropTypes from "./ContentfulModulePropTypes";
import { EventsModule } from "./EventsModule";
import { ChipModule } from "./ChipModule";
import { SlidingNavBlock } from "./SlidingNavBlock";
import { ResourceListModule, ResourceItem } from "./ResourceListModule";
import { ContentfulAsset } from "./ContentfulAsset";
import { LinkCollectionModule } from "./LinkCollectionModule";
import { HelpSearch } from "../HelpSearch";
import { PartnersModule } from "./PartnersModule";
import { FaqCategoriesModule } from "./FaqCategoriesModule";
import { PromotionBannerModule } from "./PromotionBannerModule";
import { StepsModule } from "./StepsModule";

const ContentfulModule = ({ module, pathname }) => {
  const type = module?.internal?.type || ``;

  if (type === `ContentfulEventsModule`) {
    return <EventsModule {...module} />;
  }

  if (type === `ContentfulSlidingNavBlock`) {
    return <SlidingNavBlock {...module} />;
  }

  if (type === `ContentfulChipModule`) {
    return <ChipModule {...module} />;
  }

  if (type === `ContentfulResourceListModule`) {
    return <ResourceListModule {...module} />;
  }

  if (type === `ContentfulResourceItem`) {
    return <ResourceItem {...module} />;
  }

  if (type === `ContentfulAsset`) {
    return <ContentfulAsset {...module} />;
  }

  if (type === `ContentfulLinkCollectionModule`) {
    return <LinkCollectionModule {...module} />;
  }

  if (type === `ContentfulHelpSearchModule`) {
    return <HelpSearch {...module} />;
  }

  if (type === `ContentfulPartnersModule`) {
    return <PartnersModule {...module} />;
  }

  if (type === `ContentfulFaqCategoriesModule`) {
    return <FaqCategoriesModule {...module} pathname={pathname} />;
  }

  if (type === `ContentfulPromotionBannerModule`) {
    return <PromotionBannerModule {...module} />;
  }

  if (type === `ContentfulStepsModule`) {
    return <StepsModule {...module} />;
  }

  return null;
};

ContentfulModule.propTypes = {
  module: ContentfulModulePropTypes.isRequired,
  pathname: PropTypes.string,
};

export default ContentfulModule;
