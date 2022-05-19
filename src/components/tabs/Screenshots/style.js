import styled, { css } from 'styled-components';



export const Padding = styled.div`
  padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
`

export const ExpandedContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: start;
`;

export const Image = styled.img`
  display: inline-block;
  vertical-align: middle;

  height: fit-content;
  max-width: 256px;
  min-width: 128px;

`;
