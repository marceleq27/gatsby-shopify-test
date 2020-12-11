import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import ContextProvider from 'provider/ContextProvider';

import GlobalStyles from 'theme/globalStyles';
import Navigation from 'components/Navigation';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
`;

const Layout = ({ children }) => (
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Navigation siteTitle={data.site.siteMetadata.title} />
            <Wrapper>
              {children}
              <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </footer>
            </Wrapper>
          </>
        )}
      />
    </ThemeProvider>
  </ContextProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
