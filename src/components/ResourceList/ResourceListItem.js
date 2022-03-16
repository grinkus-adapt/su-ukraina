import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const ResourceListItem = ({ title, subtitle, url }) => {
  return (
    <li className="ResourceListItem">
      <div className="ResourceListItem__content">
        {!!title && <h3>{title}</h3>}
        {!!subtitle && <p>{subtitle}</p>}
      </div>
      <Button
        icon={`arrow-blue`}
        href={url}
        color={`transparent`}
        text={`Šaltinis`}
        position={`right`}
        target="_blank"
      />
    </li>
  );
};

ResourceListItem.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default ResourceListItem;
