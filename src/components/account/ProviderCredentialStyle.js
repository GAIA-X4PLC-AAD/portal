import styled from 'styled-components';
import * as S from '../../common/styles.js';

export const CredentialWrapper = styled.div`
    margin: 20px;
`;

export const FlexTable = styled.div`
    display: flex;
    flex-flow: row wrap;
    transition: 0.5s;
    border-bottom: 1px solid;
`;

export const FlexHeader = styled(FlexTable)`
font-family: 'TeleNeo';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
`;

export const FlexCell = styled(FlexTable)`
font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 20px;
letter-spacing: 0.25px;
color: #1C0E15;
`;


export const FlexRow = styled.div`
    flex:1;
`;

export const CredentialDropDown = styled.div`
    flex:0.2;
    align-content: right;
`;

export const CredentialEditWrap = styled.div`
    flex: 0 0 100%;
    display: flex;
    flex-flow: row wrap;
    transition: 0.5s;

    font-family: 'TeleNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;

    color: #4B4B4B;
`;

export const CredentialEditColumn = styled.div`
    display: flex;
    flex-flow: column wrap;
    flex:1;
    text-align: left;
    margin: 10px 0px 10px 0px;
`;

export const CredentialEditColumnInput= styled.input`
    width: 90%;
    
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;

    letter-spacing: 0.25px;
    color: #1C0E15;    
`;

export const CredentialEditRow = styled.div`
    flex: 0 0 100%;
    text-align: left;
`;

export const CredentialEditRowInput=styled.input`
width: 95%;
margin: 0px 0px 10px 0px;
`;

export const CredentialEditRowSelect=styled.select`
    width: 96%;
    margin: 0px 0px 10px 0px;
`;

export const CredentialEditButton=styled(S.BlueButton)`
    padding: 8px 16px;
    margin: 8px 16px;
    display: flex;
    align-items: center;
    text-align: center;
`;

export const CredentialCancelButton = styled(S.CancelButton)`
    display: flex;
    padding: 8px 16px;
    margin: 8px 16px;
`;
    
export const CredentialRemove = styled(S.RedTextClickable)`
    text-align: left;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
`;

export const AddUserButton = styled(S.BlueTextClickable)`
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 15px 8px;
`;

export const DropDownArrowDown = S.DropDownArrowDown;
export const DropDownArrowUp = S.DropDownArrowUp;