import React from "react";

import "./ResourceListModule.css";
import Button from "../../Button";
import {
  ResourceListModuleDefaultProps,
  ResourceListModulePropTypes,
} from "./ResourceListModulePropTypes";
import { formatRichText } from "../../../helpers/formatting";
import { getTranslatedText } from "../../../utils/getTranslatedText";

const ResourceListModule = ({ heading, subheading, resources }) => {
  return (
    <section className="ResourceListModule">
      {!!heading && <h2 className="ResourceListModule__title">{heading}</h2>}
      {subheading?.raw && formatRichText(subheading.raw)}
      <ul className="ResourceListModule__list">
        {resources?.at(0) &&
          resources.map(({ id, label, subtext, sourceUrl }) => {
            return (
              <li key={id} className="ResourceListItem">
                <div className="ResourceListItem__content">
                  <h3>{label}</h3>
                  {!!subtext && <p>{subtext}</p>}
                </div>
                <Button
                  endIcon={`arrow-blue`}
                  href={sourceUrl}
                  color={`transparent`}
                  target="_blank"
                >
                  {getTranslatedText(`labels.source`)}
                </Button>
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
