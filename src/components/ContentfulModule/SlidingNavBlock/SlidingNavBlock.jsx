import * as React from "react";

import "./SlidingNavBlock.css";
import Icon from "../../Icon";
import { ChipModule } from "../ChipModule";
import { SlidingNavBlockPropTypes } from "./SlidingNavBlockPropTypes";
import Constraint from "../../Constraint";
import { graphql } from "gatsby";

const SlidingNavBlock = ({ id = ``, children, title, icon, data }) => {
  const getModule = (data) => {
    const type = data?.internal?.type;
    if (type === `ContentfulChipModule`) {
      return <ChipModule {...data} />;
    }

    return null;
  };

  return (
    <Constraint className="Constraint--sliding-nav">
      <div id={id} className="SlidingNavBlock">
        <div className="SlidingNavBlock__title-wrapper">
          {title && (
            <h2 className="SlidingNavBlock__title">
              {!!icon && <Icon type={icon} />}
              {title}
            </h2>
          )}
        </div>
        {children && <div className="SlidingNavBlock__content">{children}</div>}
        {!children && data && (
          <div className="SlidingNavBlock__content">{getModule(data)}</div>
        )}
      </div>
    </Constraint>
  );
};

SlidingNavBlock.propTypes = SlidingNavBlockPropTypes;

export default SlidingNavBlock;

export const query = graphql`
  fragment SlidingNavBlockFragment on ContentfulSlidingNavBlock {
    title
    icon
    data {
      ... on Node {
        id
        internal {
          type
        }
        ...ChipModuleFragment
      }
    }
  }
`;
