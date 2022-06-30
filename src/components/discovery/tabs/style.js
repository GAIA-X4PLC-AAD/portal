import styled, { css } from 'styled-components';


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


export const Padding = styled.div`
  padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
  padding-top: ${props => props.paddingTop || ''};
  padding-left: ${props => props.paddingLeft || ''};
  padding-right: ${props => props.paddingRight || ''};
  align-self: ${props => props.alignSelf || ''};
`

export const ExpandedContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: start;
`;

export const AnimatedVisibility = styled.div`
${(props) => {
  if (props.visible) {
    return css`
    opacity:1;
    width:100%;
    height:100%;
    transition: width 0.5s, height 0.5s, opacity 0.5s 0.5s;
  `;
  } else {
    return css`
    opacity:0;
    width:0;
    height:0;
    transition: width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s;
  `;
  }

}}
`

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContainerX = styled.div`
  max-height: 600px;
  min-height: 400px;

  max-width: 600px;
  min-width: 400px;
`

export const CircularLoader = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

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
  max-width: ${props => props.maxWidth || ''};
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
max-width: ${props => props.maxWidth || ''};
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
  margin: 0px 8px;
  /* Background/Primary */
  background: #000094;
  border-radius: 12px;
  /* Caption */
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: white;
  line-height: 16px;
`
export const FlagImg = styled.img`
  width: 19px;
  height: 19px;
  padding: 0px 2px;
`;

