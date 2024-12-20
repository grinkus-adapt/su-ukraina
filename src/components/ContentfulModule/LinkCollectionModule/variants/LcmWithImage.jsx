import React from "react";

import Section from "../../../Section";
import Constraint from "../../../Constraint";
import Button from "../../../Button";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  LinkCollectionModuleDefaultProps,
  LinkCollectionModulePropTypes,
} from "../LinkCollectionModulePropTypes";

import "./LcmWithImage.css";

const LcmWithImage = ({ heading, links, image }) => {
  return (
    <Section className="LcmWithImage">
      <Constraint>
        <section className="LcmWithImage__section">
          <div className="LcmWithImage__text">
            {!!heading && <h2 className="LcmWithImage__title">{heading}</h2>}
            <ul className="LcmWithImage__button-list">
              {links.map(({ id, url, label }) => {
                if (!label || !url) {
                  return null;
                }
                return (
                  <li key={id}>
                    <Button
                      endIcon={`arrow-blue`}
                      to={url}
                      color={`transparent`}
                    >
                      {label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>

          {image && (
            <div className="LcmWithImage__image">
              <GatsbyImage image={getImage(image)} alt="" />
            </div>
          )}
        </section>
      </Constraint>
    </Section>
  );
};

LcmWithImage.propTypes = LinkCollectionModulePropTypes;

LcmWithImage.defaultProps = LinkCollectionModuleDefaultProps;

export default LcmWithImage;
