import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";
import { Title, Meta } from "react-head";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";

const Page = ({ data }) => {
  const crumbs = [`Darykite spaudimą`];
  const additionalNavigation = [`Akcijos ir renginiai`, `Prekių boikotas`];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const addressees = data.addressees.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout pagePath="/protesto-formos/laisku-rasymas/">
      {(!content || !content.title) && <Title>Laiškų rašymas</Title>}

      {!!content && (
        <Constraint>
          <NavigationGroup
            crumbs={crumbs}
            additionalNav={additionalNavigation}
          />
          <Title>{content.title}</Title>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <CardList>
          {addressees.map((addressee, i) => {
            return (
              <Card title={addressee.title} key={i}>
                <div>
                  <ul>
                    {addressee.type.map((singleType, j) => {
                      return <li key={j}>{singleType}</li>;
                    })}
                  </ul>
                </div>

                <h3>Klausimas, dėl kurio galima kreiptis</h3>
                <div>
                  <Linkify>{addressee.purpose}</Linkify>
                </div>

                <h3>El. pašto adresas ar kitas skaitmeninis kanalas</h3>
                <div>
                  <Linkify>{addressee.emailOrLink}</Linkify>
                </div>

                <h3>Adresas</h3>
                <div>
                  <Linkify>{addressee.address}</Linkify>
                </div>
              </Card>
            );
          })}
        </CardList>
      </Constraint>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/protesto-formos/laisku-rasymas.md$/"
        }
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
    addressees: allFile(
      filter: { sourceInstanceName: { eq: "addressees" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              type
              title
              purpose
              emailOrLink
              address
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
    addressees: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                type: PropTypes.array,
                title: PropTypes.string,
                purpose: PropTypes.string,
                emailOrLink: PropTypes.string,
                address: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
