import React from "react";
import { formatRichText } from "../../../helpers/formatting";
import {
  StepsModulePropTypes,
  StepsModuleDefaultProps,
} from "./StepsModulePropTypes";
import { getTranslatedText } from "../../../utils/getTranslatedText";
import { handleAnchorClick } from "../../Faq";

import "./StepsModule.css";
import { useEffect } from "react";
import { openDetailsByHash } from "../../../helpers/handlers";
import Button from "../../Button";
import Constraint from "../../Constraint";
import classNames from "classnames";
import { graphql } from "gatsby";

const StepsModule = ({ steps, fullWidth }) => {
  useEffect(() => {
    window.addEventListener(`hashchange`, openDetailsByHash);
    openDetailsByHash();

    return () => {
      window.removeEventListener(`hashchange`, openDetailsByHash);
    };
  }, []);

  return (
    <Constraint className={classNames({ "Constraint--full-width": fullWidth })}>
      <div className="StepsModule">
        {steps.map((step, index) => {
          const tabId = `tab-${index + 1}`;
          return (
            <details key={step.id} id={tabId} open={index === 0}>
              <summary>
                <h3>
                  <b>
                    {getTranslatedText(`labels.step`)} {index + 1}.
                  </b>
                  {` `}
                  {step.question}
                </h3>
              </summary>
              <div className="StepsModule__content">
                {formatRichText(step.answer.raw)}
                <div className="StepsModule__actions">
                  {step?.additionalLink && (
                    <Button
                      color="primary-outline"
                      to={step.additionalLink.url}
                    >
                      {step.additionalLink.label}
                    </Button>
                  )}
                  <div className="StepsModule__copy-action">
                    <a
                      href={`#${tabId}`}
                      data-copied={getTranslatedText(
                        `actions.copyLinkPopupLabel`
                      )}
                      onClick={(e) => {
                        handleAnchorClick(e);
                      }}
                      className="copy"
                    >
                      {getTranslatedText(`actions.copyLink`)}
                    </a>
                  </div>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </Constraint>
  );
};

StepsModule.propTypes = StepsModulePropTypes;

StepsModule.defaultProps = StepsModuleDefaultProps;

export default StepsModule;

export const query = graphql`
  fragment StepsModuleFragment on ContentfulStepsModule {
    steps {
      ... on Node {
        id
        internal {
          type
        }
        ...FaqItemFragment
      }
    }
  }
`;
