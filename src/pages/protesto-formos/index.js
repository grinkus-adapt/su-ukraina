import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumbs";
import Section from "../../components/Section";
import LinkCollection from "../../components/LinkCollection";
import LinkCollectionItem from "../../components/LinkCollection/LinkCollectionItem";

const Page = ({ data }) => {
  const crumbs = [`Protesto formos`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  return (
    <Layout pagePath="/protesto-formos/">
      <Title>Protesto formos</Title>

      {!!content && (
        <Constraint>
          <Breadcrumb className="__solo" crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Section className="LinksCollectionWrapper">
        <Constraint>
          <LinkCollection>
            <LinkCollectionItem
              to={`/protesto-formos/akcijos/`}
              text={`Akcijos`}
            />
            <LinkCollectionItem
              to={`/protesto-formos/renginiai/`}
              text={`Renginiai`}
            />
            <LinkCollectionItem
              to={`/protesto-formos/budinkite-veikti/`}
              text={`Budinkite veikti`}
            />
          </LinkCollection>
        </Constraint>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/protesto-formos.md$/" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            html
            excerpt(format: PLAIN, pruneLength: 160)
          }
        }
      }
    }
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
            excerpt: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

export default Page;
