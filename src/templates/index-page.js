import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";

export const IndexPageTemplate = ({
  image,
  title,
  sectionTopRight,
  sectionBottomLeft,
  sectionBottomRight,
}) => (
  <div>
    <section>
      <h2>{sectionTopRight.title}</h2>
    </section>
    <section>
      <h2>{sectionBottomLeft.title}</h2>
      <p>{sectionBottomLeft.description}</p>
    </section>
    <section>
      <h2>{sectionBottomRight.title}</h2>
      <p>{sectionBottomRight.description}</p>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  sectionTopRight: PropTypes.shape({
    title: PropTypes.string,
  }),
  sectionBottomLeft: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  sectionBottomRight: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        image={frontmatter.image}
        sectionTopRight={frontmatter.sectionTopRight}
        sectionBottomLeft={frontmatter.sectionBottomLeft}
        sectionBottomRight={frontmatter.sectionBottomRight}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sectionTopRight {
          title
        }
        sectionBottomLeft {
          title
          description
        }
        sectionBottomRight {
          title
          description
        }
      }
    }
  }
`;
