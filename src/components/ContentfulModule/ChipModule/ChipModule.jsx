import React from "react";
import ContactChip from "./ContactChip";
import { ChipModulePropTypes } from "./ChipModulePropTypes";
import { graphql } from "gatsby";

const ChipModule = ({ chips }) => {
  return (
    <div className="ChipModule">
      {chips?.at(0) &&
        chips.map((chip) => {
          return <ContactChip key={chip.id} {...chip} />;
        })}
    </div>
  );
};

ChipModule.propTypes = ChipModulePropTypes;

export default ChipModule;

export const query = graphql`
  fragment ChipModuleFragment on ContentfulChipModule {
    chips {
      ...ChipFragment
    }
    fullWidth
  }
`;
