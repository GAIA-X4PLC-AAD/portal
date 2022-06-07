import styled from 'styled-components';
import * as S from '../../../common/styles';

export const Column = styled.div`
    with: 100%;
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: #2A2A2A;
    text-align: left;
    padding: 13px 13px 12px 12px;
    display: flex;
    flex-direction: row;
    background: #F8F8F8;
    border-radius: 4px;
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const CheckBox = styled.input`
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E9E9E9 !important;
    border-radius: 3px;
    align-self: center;
    margin: 0;
`;

export const CheckBoxText = styled.div`
align-self: center;
margin:0;
margin-left: 8px;
`

export const Filters = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 0px 12px;
    gap: 12px;
    width: 312px;
`;

export const Category=styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: #000000;
    margin:6px 12px;
    background: transparent;
`;

export const Rounded=styled.div`
    color:  #B3B3B3;
    margin: 0;
    margin-left:auto;
`;

export const FilterHeader=styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.25px;
    color: #1C0E15;
    text-align: left;
`;

export const Button = S.BlueButton;
