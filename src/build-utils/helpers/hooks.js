/**
 * Finds all the SlidingNavBlocks in your modules array and injects them with the `linkId`.
 *
 * @param {Array} modules All of the modules on your single page. Make sure it has the internal type queried.
 * @returns {Array} Array of modules with an additional `linkid`.
 */
const getSlidingNavData = (modules) => {
  const filteredModules = modules.filter((module) => {
    return module.internal.type === `ContentfulSlidingNavBlock`;
  });
  if (filteredModules?.at(0)) {
    return filteredModules.map((module) => {
      return { ...module, linkId: module.id };
    });
  }
  return null;
};

/**
 * Returns all faq pages data required for FaqNav by locale.
 * @param {Array} faqPages Array of FAQ pages, typically queried by GraphQL.
 * @param {String} locale String locale, eg.: "lt-LT". Also queried by GraphQL, usually named "node_locale".
 * @returns {Array} Returns an array of objects with necessary data for the FaqNav.
 */
const getFaqNavDataByLocale = (faqPages, locale) => {
  return faqPages
    .filter((page) => {
      return page.node_locale === locale;
    })
    .map(({ id, pageHeading, slug, iconType }) => {
      return {
        id,
        pageHeading,
        slug,
        iconType,
      };
    });
};

module.exports = {
  getSlidingNavData,
  getFaqNavDataByLocale,
};