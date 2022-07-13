import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

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

export const BlueUploadLabel = styled.label`
border: 2px solid #000094;
border-radius: 4px 4px 4px 4px;
font: 700 18px/1.11 "Titillium Web", Helvetica, Arial, serif;
letter-spacing: 0.25px;
color: #000094;
background-color: #fff;
padding: 0.3em 2em;
cursor: pointer;
margin-top:15px;
min-width: 65px;
text-align: center;
display: inline-block;
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

export const DropDownArrowDownSmall = styled.div`
    content: url('/images/DropDownArrowDown.svg');
    margin: auto;
    object-fit:none;

    transform: scale(0.5);
`;

export const ArrowLeft = styled.div`
    content: url('/images/DropDownArrowDown.svg');
    transform: rotate(90deg);
    /* filter: invert(74%) sepia(0%) saturate(1%) hue-rotate(3deg) brightness(96%) contrast(95%); */
`;

export const ArrowRight = styled.div`
    content: url('/images/DropDownArrowDown.svg');


    transform: rotate(270deg)
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

export const RedText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    min-width: 1px;
    color: #EE1D23;
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
    height: ${props => props.height || 'auto'};
    justify-content: ${props => props.justifyContent || ''};
    align-items: ${props => props.alignItems || ''};
    gap: ${props => props.gap || 'unset'}
`
export const WrapRow = styled(Row)`
    flex-wrap: wrap`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    align-items: ${props => props.alignItems || ''};
    justify-content: ${props => props.justifyContent || ''};
`
export const WrapColumn = styled(Column)`
    flex-wrap: wrap`;

export const Style = styled.div`
    border-top: ${props => props.borderTop ? '1px solid #E9E9E9' : ''};
    border-bottom: ${props => props.borderBottom ? '1px solid #E9E9E9' : ''};
    flex-grow: ${props => props.flexGrow || 0};
    justify-content: ${props => props.justifyContent || ''};
    display: ${props => props.display || ''};
    position: ${props => props.position || ''};
    left: ${props => props.left || ''};
    right: ${props => props.right || ''};
    top: ${props => props.top || ''};
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
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-top: ${props => props.marginTop || '0px'};
    z-index: ${props => props.zIndex || 'auto'};
    background-color: ${props => props.backgroundColor || ''};
    text-align: ${props => props.textAlign || ''};
    /* filter: ${props => props.elevation ? 'drop-shadow(0px 2px 4px rgba(29, 36, 48, 0.12))' : 'unset'}; */
    border-radius: ${props => props.borderRadius || ''};
`

export const HeaderTitle = styled.div`
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
  object-fit: ${props => props.objectFit || 'cover'};
  object-position: ${props => props.objectPosition || '50% 50%'};

  max-width: ${props => props.maxWidth || ''};
  min-width: ${props => props.minWidth || ''};
  filter: ${props => props.filter || ''};;
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
`;

export const CaptionTeleNeoText = styled.div`
font-family: 'TeleNeo';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
letter-spacing: 0.4px;
color: #4B4B4B;
`;
//#1C0E15;;
export const BodySmallText = styled.div`
font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
letter-spacing: 0.25px;
color: ${props => props.color || '#000000'};
`;

export const CaptionText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    letter-spacing: 0.4px;
    color: ${props => props.color || '#000000'};
`;

export const Card = styled.div`
    box-sizing: border-box;

    background: ${props => props.background || '#E9E9E9'};
    /* Background/Lighter Grey */
    border: 1px solid  ${props => props.borderColor || '#818C99'};
    border-radius: 4px;
    box-shadow: ${props => props.boxShadow || ''};
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
    cursor: ${props => props.isButton ? 'pointer' : ''};
    justify-content: center;
    background-color: ${props => props.backgroundColor || '#F9F9F9'};
    /* clip-path: circle(); */
    background: ${props => props.background || '#F9F9F9'};

    border: ${props => props.borderThickness || '1px'} solid ${props => props.borderColor || '#E9E9E9'};
    border-radius: ${props => props.borderRadius || '50%' } ;
    background-image: url(${props => props.backgroundImage || ''});
    background-size: contain;
`

export const ButtonText = styled.div`
    border-bottom: ${props => props.selected ? '4px solid #000094' : '4px solid #0000'}; 
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    cursor: pointer;
    color: ${props => props.disabled ? '#bababa' : (props.color || '#000094')};
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

export const H4LightText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;

    letter-spacing: 0.25px;

    color: #1C0E15;
`


export const BodyText = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.25px;

    /* identical to box height, or 133% */

    letter-spacing: 0.25px;

    /* greyscale/dark */

    text-align: ${props => props.textAlign || ''};
    color: ${props => props.color || '#4B4B4B'};
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
`;
export const TagLink = styled(Tag)`
    cursor: pointer;`;

export const BlueLinkText = styled.div`
    font-family: Titillium Web;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: center;
    color: #000094;
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;
`;

export const BodyBoldText = styled.div`
/* Body Bold */
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */

    letter-spacing: 0.25px;

    /* Text/Dark Grey */

    color: #2A2A2A;
`


export const MasterButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 8px;
    margin-right: 10px;
    gap: 8px;
    cursor: pointer;
    width: 136px;
    

    /* Background/Primary */

    /* background: #000094; */
    background: ${props => props.disabled ? '#E8E8E8' : '#000094'};
    border-radius: 4px;

    /* Button */

    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    /* identical to box height, or 111% */
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.25px;
    color: ${props => props.disabled ? '#1C0E15' : '#FFFFFF'};
`

export const HorizontalLine = styled.div`
    height: 1px;
    border: 0;
    border-top: 1px solid ${props => props.color || '#E8E8E8'};
    margin: 1em 0;
    padding: 0;
`

export const OutlineButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: start;
    padding: 8px 32px;
    gap: 8px;
    flex-wrap: wrap;

    /* height: 33px; */

    /* Background/Primary */
    background: ${props => props.disabled ? '#E8E8E8' : ''};
    border: 2px solid ${props => props.disabled ? '#E8E8E8' : '#000094'};
    border-radius: 4px;
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    /* or 111% */

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.25px;

    /* Background/Primary */
    cursor: pointer;
    color: ${props => props.disabled ? '#1C0E15' : '#000094'}
`;

export const TextInput = styled.input`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    /* identical to box height, or 133% */

    letter-spacing: 0.25px;

    /* greyscale/darker */

    color: #1C0E15;

    padding: 10px;

    /* background: papayawhip; */
    border: 1px solid #E8E8E8;
    border-radius: 4px;

    ::placeholder {}
`

export const H2Text = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: ${props => props.color || '#1C0E15' };
    /* color: white; */
`;

export const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

export const SliderBullet = styled.button`
    width: 18px;
    height: 5px;
    border: 0px solid #0000;
    background-color: #fff;
    background: ${(props) => props.isActive ? '#8D8DFF' : '#FFFFFF'};
    /* padding: 0px 4px; */
    margin: 0px 4px;
    border-radius: 4px;
`

/* export const HeaderButton = styled.button`
  border: 2px solid #000094;
  border-radius: 4px 4px 4px 4px;
  background-color: #fff;
  color: #000094;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  padding: 1.33em;
  text-decoration: none;
  font-weight: 700;
` */

export const Padding = styled.div`
  padding: ${props => props.vertical || '0px'} ${props => props.horizontal || '0px'};
  padding-top: ${props => props.paddingTop || ''};
  padding-left: ${props => props.paddingLeft || ''};
  padding-right: ${props => props.paddingRight || ''};
  align-self: ${props => props.alignSelf || ''};
`

export const H1Text = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;
    /* identical to box height, or 133% */


    color: #000000;
`;

