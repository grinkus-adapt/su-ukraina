import classNames from "classnames";
import React from "react";

import Button from "../../../Button";
import Constraint from "../../../Constraint";
import Section from "../../../Section";
import {
  LinkCollectionModuleDefaultProps,
  LinkCollectionModulePropTypes,
} from "../LinkCollectionModulePropTypes";

import "./LcmLightBlocks.css";

const LcmLightBlocks = ({
  heading,
  subheading,
  links,
  className,
  fullWidth,
}) => {
  return (
    <Section className={classNames(`LcmLightBlocks`, className)}>
      <Constraint
        className={classNames({ "Constraint--full-width": fullWidth })}
      >
        {!!heading && <h2 className="LcmLightBlocks__heading">{heading}</h2>}
        {!!subheading && (
          <p className="LcmLightBlocks__subheading">{subheading}</p>
        )}
        <ul className="LcmLightBlocks__button-list">
          {links.map((link) => {
            return (
              <li key={link.id}>
                <Button to={link.url} color={`tertiary`}>
                  {link.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </Constraint>
    </Section>
  );
};

LcmLightBlocks.propTypes = LinkCollectionModulePropTypes;

LcmLightBlocks.defaultProps = LinkCollectionModuleDefaultProps;

export default LcmLightBlocks;
