import styled from 'styled-components';
import Image from 'gatsby-image';
import { breakpoints } from 'theme/media';

export const Img = styled(Image)`
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${`${breakpoints.pc}px`};
`;
