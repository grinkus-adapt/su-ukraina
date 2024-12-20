import { useLocation } from "@gatsbyjs/reach-router";

const isUkrainianPage = () => {
  const { pathname } = useLocation();
  return pathname.includes(`/ua/`);
};

const getLocaleFromPath = () => {
  const { pathname } = useLocation();

  if (pathname.includes(`/ua`)) {
    return `uk-UA`;
  }

  if (pathname.includes(`/en`)) {
    return `en-US`;
  }

  return `lt-LT`;
};

const getRichTextModuleData = (node, refs) => {
  const contentfulId = node.data.target.sys.id;
  const moduleData = refs.find((ref) => ref.contentful_id === contentfulId);

  return moduleData || null;
};

// Used stackoverflow as reference
// Not a 1:1 copy
// https://stackoverflow.com/a/37033774
const openDetailsByHash = () => {
  const hash = location.hash.substring(1);
  if (hash) {
    const hashElement = document.getElementById(hash);
    if (hashElement.tagName === `DETAILS`) {
      hashElement.open = true;
      return;
    }

    const details = Array.from(hashElement.children).find(
      ({ tagName }) => tagName === `DETAILS`
    );

    if (details) {
      details.open = true;
    }
  }
};

export {
  isUkrainianPage,
  getLocaleFromPath,
  getRichTextModuleData,
  openDetailsByHash,
};
