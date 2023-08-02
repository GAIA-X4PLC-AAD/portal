import styled from "styled-components";
import * as S from './styles';

export const ActionCancelModalHeader = styled.div`
border-bottom: 1px solid #737373;
width: 100%;
padding-bottom: 1em;
font: 24px/1.5 "Titillium Web", Helvetica, Arial, serif;
color: #1c0e15;
letter-spacing: 0.25px;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2em;
    width: 100%;
`;

export const ModalMessage = styled.div`
    font: 18px/1.33 "Titillium Web", Helvetica, Arial, serif;
    color: #4b4b4b;
    letter-spacing: 0.25px;
    margin: 2em 0
`;

export const ModalButtonsBar = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    text-align: center;    
`;

export const CancelButton = S.CancelButton;
export const BlueButton = S.BlueButton;