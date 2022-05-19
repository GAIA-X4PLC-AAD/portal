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