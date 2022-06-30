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
  margin-left: 4px;
    margin-right: 4px;
    min-width: 100px;
  &:hover{
    cursor: pointer;
};
`

