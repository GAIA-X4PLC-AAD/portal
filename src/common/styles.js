import styled from 'styled-components';

export const CancelButton = styled.button`
    border: 2px solid #e8e8e8;
    border-radius: 4px 4px 4px 4px;
    font: 700 18px/1.11 "Titillium Web", Helvetica, Arial, serif;
    letter-spacing: 0.25px;
    color: #1c0e15;
    background-color: #e8e8e8;
    padding: 0.3em 2em;
    cursor: pointer;
    margin-left: 1em;
`;


export const BlueButton = styled.button`
border: 2px solid #000094;
border-radius: 4px 4px 4px 4px;
font: 700 18px/1.11 "Titillium Web", Helvetica, Arial, serif;
letter-spacing: 0.25px;
color: #000094;
background-color: #fff;
padding: 0.3em 2em;
cursor: pointer;
margin-left:1em;
:disabled {
    cursor:default;
    pointer-events: none;
    opacity: 0.3; 
}
`;
export const DropDownArrowUp = styled.div`
    content: url('/images/DropDownArrowUp.svg');
    margin: auto;
    object-fit:none;
    height:100%;
`;

export const DropDownArrowDown = styled.div`
    content: url('/images/DropDownArrowDown.svg');
    margin: auto;
    object-fit:none;
    height:100%;
`;

export const RedTextClickable = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    min-width: 1px;
    color: #EE1D23;
    cursor: pointer;
`;

export const BlueTextClickable = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.25px;
    color: #000094;
    cursor: pointer;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || 'auto'};
    justify-content: ${props => props.justifyContent || ''};
    align-items: ${props => props.alignItems || ''};
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || 'auto'};
`

export const Style = styled.div`
    border-top: ${props => props.borderTop ? '1px solid #E9E9E9' : ''};
    border-bottom: ${props => props.borderBottom ? '1px solid #E9E9E9' : ''};
    flex-grow: ${props => props.flexGrow || 0};
    justify-content: ${props => props.justifyContent || ''};
    display: ${props => props.display || ''};
    position: ${props => props.position || ''};
    left: ${props => props.left || ''};
    bottom: ${props => props.bottom || ''};
    text-align: start;
    padding-top: ${props => props.paddingTop || '0px'};
    padding-left: ${props => props.paddingLeft || '0px'};
    padding-right: ${props => props.paddingRight || '0px'};
    vertical-align: ${props => props.verticalAlign || 'unset'};
    object-fit: ${props => props.objectFit || ''};
    max-width: ${props => props.maxWidth || ''};
    min-width: ${props => props.minWidth || ''};
    min-height: ${props => props.minHeight || ''};
    height: ${props => props.height || ''};
    width: ${props => props.width || ''};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    margin-top: ${props => props.marginTop || '0px'};
    z-index: ${props => props.zIndex || 'auto'};
    background-color: ${props => props.backgroundColor || ''};
    text-align: ${props => props.textAlign || ''};
    /* filter: ${props => props.elevation ? 'drop-shadow(0px 2px 4px rgba(29, 36, 48, 0.12))' : 'unset'}; */
    /* border-radius: 4px; */
`

export const HeaderTitle=styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.25px;
    color: #1C0E15;
    text-align: left;
`;


export const Image = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: ${props => props.width || ''};
  height: ${props => props.height || ''};
  object-fit: cover;
  /* height: fit-content; */
  max-width: ${props => props.maxWidth || ''};
  min-width: ${props => props.minWidth || ''};
`;


export const BodySmallBoldText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    /* identical to box height, or 133% */

    letter-spacing: 0.25px;

    color: #000000;
`

export const CaptionText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    letter-spacing: 0.4px;
    color: #000000;
`

export const Card = styled.div`
    box-sizing: border-box;

    background: #E9E9E9;
    /* Background/Lighter Grey */

    border: 1px solid #818C99;
    border-radius: 4px;
`

export const Circle = styled.div`
    /* BG */
    text-align: center;
    display: flex;
    align-content: center;
    align-items: center;
    width: ${props => props.radius || '50px'};
    min-width: ${props => props.radius || '50px'};
    height: ${props => props.radius || '50px'};

    justify-content: center;
    background-color: #F9F9F9;
    /* clip-path: circle(); */
    background: ${props => props.background || '#F9F9F9'};

    border: 1px solid ${props => props.borderColor || '#E9E9E9'};
    border-radius: 50%;
`

export const ButtonText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    cursor: pointer;
    color: ${props => props.disabled? '#bababa' : '#000094'};
`

export const H4Text = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;

    letter-spacing: 0.25px;

    color: #1C0E15;
`