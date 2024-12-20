import React from "react";
import classNames from "classnames";

import PartnerList from "./PartnerList";
import Partner from "./Partner";
import {
  PartnersModuleDefaultProps,
  PartnersModulePropTypes,
} from "./PartnersModulePropTypes";
import Constraint from "../../Constraint";

import "./PartnersModule.css";
import { graphql } from "gatsby";

const PartnersModule = ({ heading, partnerCollections, fullWidth }) => {
  return (
    <Constraint className={classNames({ "Constraint--full-width": fullWidth })}>
      <div className="PartnersModule">
        <h2 className="PartnersModule__title">{heading}</h2>

        <div className="PartnersModule__category-wrapper">
          {partnerCollections.map((collection) => {
            if (!collection?.partners?.at(0)) {
              return null;
            }
            return (
              <div key={collection.id} className="PartnersModule__category">
                <h3 className="PartnersModule__category-title">
                  {collection.category}
                </h3>
                <PartnerList>
                  {collection.partners.map((partner) => {
                    return <Partner key={partner.id} {...partner} />;
                  })}
                </PartnerList>
              </div>
            );
          })}
        </div>
      </div>
    </Constraint>
  );
};

PartnersModule.propTypes = PartnersModulePropTypes;

PartnersModule.defaultProps = PartnersModuleDefaultProps;

export default PartnersModule;

export const query = graphql`
  fragment PartnersModuleFragment on ContentfulPartnersModule {
    heading
    partnerCollections {
      ... on ContentfulPartnerCollection {
        id
        category
        partners {
          ... on ContentfulPartner {
            id
            label
            url
            logo {
              gatsbyImageData(height: 80, placeholder: BLURRED, formats: WEBP)
            }
          }
        }
      }
    }
    fullWidth
  }
`;
