import styled from 'styled-components';

export const SubMenu = styled.div`
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    height: 12px;
    background-color: #000094 !important;
` ;
export const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: var(--content-width);
  height: 96px;
`;

export const TopMenuLogo = styled.div`
  display: flex;
  margin: 20px;
`;

export const TopMenuLinks = styled.div`
  display: flex;
  column-gap: 2em;
  margin: auto 0;
`;

export const TopMenuLinkButton = styled.a`
  text-decoration: none;
`;

export const TopMenuSignIn = styled.a`
  display: flex;
  column-gap: 2em;
  width: 230px;
`;

export const HeaderButton = styled.button`
  border: ${props => props.$border ? '2px solid #000094' : '2px solid #ffff'};
  border-radius: 4px 4px 4px 4px;
  background-color: #fff;
  color: #000094;
  margin: 25px 0;
  /* margin-block-start: 1.33em;
  margin-block-end: 1.33em; */
  padding: 12px 20px;
  text-decoration: none;
  font-weight: 700;



  &:hover{
    cursor: pointer;
};
`

export const SimpleButton = styled.button`

  border-color: #0000;
  background-color: #fff;

  text-decoration: none;
  font-weight: 700;
  &:hover{
    cursor: pointer;
};
`

