import PropTypes from "prop-types";

const EventItemPropTypes = {
  id: PropTypes.string.isRequired,
  eventType: PropTypes.string,
  title: PropTypes.string.isRequired,
  organizer: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.shape({
    raw: PropTypes.string,
  }),
  eventUrl: PropTypes.string,
};

const EventsModulePropTypes = {
  id: PropTypes.string.isRequired,
  internal: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape(EventItemPropTypes)),
  fullWidth: PropTypes.bool,
};

const EventsModuleDefaultProps = {
  events: [
    {
      eventType: ``,
      organizer: ``,
      startDate: ``,
      endDate: ``,
      location: ``,
      description: {
        raw: ``,
      },
      eventUrl: ``,
    },
  ],
  fullWidth: false,
};

export { EventsModuleDefaultProps, EventsModulePropTypes, EventItemPropTypes };
