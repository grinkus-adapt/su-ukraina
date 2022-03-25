import * as React from "react";
import { Title, Meta } from "react-head";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import Constraint from "../../components/Constraint";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../../components/Layout";
import FaqNav from "../../components/Faq/FaqNav";
import Section from "../../components/Section";
import Breadcrumb from "../../components/Breadcrumbs";

const Page = ({ data }) => {
  const crumbs = [`Важлива інформація`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const faqNav = data.faq.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  return (
    <Layout>
      {(!content || !content.title) && <Title>Gidas Ukrainiečiams</Title>}
      <Meta
        name="description"
        content="Sąrašas iniciatyvų vykdomų Lietuvoje, kurios skirtos pagelbėti Ukrainos žmonėms"
      />

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/refugee_guide.jpg"
          alt="Refugee Guide"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <Breadcrumb crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <FaqNav navData={faqNav} modifier="wide" />
        </Constraint>
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: { regex: "//src/content/pages/refugee-guide.md$/" }
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
    faq: allFile(
      filter: { sourceInstanceName: { eq: "refugee-guide" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              title_override
              slug
            }
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
    faq: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title_override: PropTypes.string,
                title: PropTypes.string,
                slug: PropTypes.slug,
              }),
            }),
            html: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

export default Page;
