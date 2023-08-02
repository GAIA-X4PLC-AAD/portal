
import styled, { css } from 'styled-components';


export const SlotBox = styled.div`
box-sizing: border-box;
/* Auto layout */
display: flex;
flex-direction: column;
justify-content: ${props => (props.justifyContent ? props.justifyContent : 'center')};
align-items: center;
padding: 12px;
gap: 10px;
width: ${props =>props.width? props.width : '225px'};
height: 480px;
left: 485px;
top: 622px;
background: #FFFFFF;
border: 1px solid ${props =>props.selected? '#000094': '#E9E9E9'};
`;

export const AvailabeServices = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
margin-top: 8px;
margin-right: auto;
margin-bottom: 8px;
margin-left: auto;
padding: 2px 8px;
background: #E9E9E9;
border-radius: 12px;
width: fit-content;
`;

export const BookSaveInput = styled.input`
height: 36px;
width: 446px;
margin: 0px 24px;
background: #FFFFFF;
border: 1px solid #E8E8E8;
border-radius: 4px;

font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
/* identical to box height, or 133% */

letter-spacing: 0.25px;

/* greyscale/darker */

color: #1C0E15;
`;