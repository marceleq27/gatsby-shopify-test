import styled from 'styled-components';
import { Link } from 'gatsby';

import { breakpoints } from 'theme/media';

export const Wrapper = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.45rem;
  margin: 0 auto;
  max-width: 960px;
`;

export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: ${breakpoints.tablet}px) {
    font-size: 1.4rem;
  }
`;

export const CartCounter = styled.span`
  background-color: white;
  color: #663399;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`;
