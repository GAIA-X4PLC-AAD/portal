import styled from 'styled-components';

export const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: var(--content-width);
`;

export const TopMenuLogo = styled.div`
  display: flex;
  margin: auto 0;
`;

export const TopMenuLinks = styled.div`
  display: flex;
  column-gap: 2em;
  margin: auto 0;
`;

export const TopMenuLinkButton = styled.a`
  text-decoration: none;
`;

export const TopMenuSignIn= styled.a`
  display: flex;
  column-gap: 2em;
  width: 230px;
`;

export const HeaderButton = styled.button`
  border: 2px solid #000094;
  border-radius: 4px 4px 4px 4px;
  background-color: #fff;
  color: #000094;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  padding: 1.33em;
  text-decoration: none;
  font-weight: 700;
`

export const SmallPadding = styled.div`
  padding: 8px;
`

export const Padding = styled.div`
  padding: ${props => props.vertical} ${props => props.horizontal};
`

export const ExpandedContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: start;
`;

export const VerticalContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  height: 100%;
  padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  width: 100%;
`;

export const Image = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  height: auto;

`;

export const Title = styled.p`
  /* Body Bold */
  font-family: "Titillium Web";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin: 0px;
  /* identical to box height, or 133% */

  color: #262626;
`;

export const Body = styled.p`
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-top: 0px;
  margin-bottom: 0px;
  /* or 133% */
  color: #262626;
`;

export const Subtitle = styled.p`
/* Caption */
font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
margin-top: 0px;
margin-bottom: 0px;
/* identical to box height, or 133% */
display: flex;
align-items: center;
letter-spacing: 0.4px;

/* greyscale/base */
color: #B2B2B2;
`;

export const Tag = styled.div`
  /* Tag */
  padding: 2px 12px;
  gap: 10px;
  color: white;
  margin: 0px 8px;
  /* Background/Primary */
  background: #000094;
  border-radius: 12px;
  /* Caption */
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`


