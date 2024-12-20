import React from "react";

import "./ResourceListModule.css";
import {
  ResourceListModuleDefaultProps,
  ResourceListModulePropTypes,
} from "./ResourceListModulePropTypes";
import { formatRichText } from "../../../helpers/formatting";
import ResourceItem from "./ResourceItem";
import { graphql } from "gatsby";

const ResourceListModule = ({ heading, subheadingRich, resources }) => {
  return (
    <section className="ResourceListModule">
      {!!heading && <h2 className="ResourceListModule__title">{heading}</h2>}
      {subheadingRich?.raw && formatRichText(subheadingRich.raw)}
      <ul className="ResourceListModule__list">
        {resources?.at(0) &&
          resources.map((item) => {
            return (
              <li key={item.id}>
                <ResourceItem {...item} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

ResourceListModule.propTypes = ResourceListModulePropTypes;

ResourceListModule.defaultProps = ResourceListModuleDefaultProps;

export default ResourceListModule;

export const query = graphql`
  fragment ResourceListModuleFragment on ContentfulResourceListModule {
    heading
    subheading {
      raw
    }
    resources {
      ...ResourceItemFragment
    }
    fullWidth
  }
`;
