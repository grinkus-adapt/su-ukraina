import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";
import { Title, Meta } from "react-head";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import ResourceList from "../../components/ResourceList";
import ResourceListItem from "../../components/ResourceList/ResourceListItem";
import SubPage from "../../components/SubPage";

const Page = ({ data }) => {
  const crumbs = [`Kaip saugotis nuo sukčių ir dezinformacijos`];
  const additionalNavigation = [
    `Patikima informacija`
  ];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const handbooks = data.handbooks.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  return (
    <Layout pagePath="/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/">
      <Title>Kaip saugotis nuo sukčių ir dezinformacijos</Title>

      {!!content && (
        <Constraint>
          <NavigationGroup
            crumbs={crumbs}
            additionalNav={additionalNavigation}
          />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        {handbooks.map((handbook, i) => {
          return (
            <SubPage title={handbook.title} intro={handbook.intro}>
              <ResourceList>
                {handbook.resources?.map((resource, i) => {
                  return (
                    <ResourceListItem title={resource.title} subtitle={resource.subtitle} url={resource.link}/>
                  )
                })}
              </ResourceList>
            </SubPage>
          );
        })}
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
          regex: "//src/content/pages/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos.md$/"
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
    handbooks: allFile(
      filter: { sourceInstanceName: { eq: "beware-of-scams-and-misinformation" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              resources {
                title
                subtitle
                link
              }
              intro
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
    handbooks: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                intro: PropTypes.string,
                resources: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    subtitle: PropTypes.string,
                    link: PropTypes.string,
                  })
                ),
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
