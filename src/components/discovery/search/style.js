import styled from 'styled-components';
import * as S from '../../../common/styles';

export const Column = styled.div`
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
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.25px;
    color: #1C0E15;
    text-align: left;
`;

export const SearchTerm=styled.input`
width: 751px;
height: 48px;
right: 0%;
background: #F8F8F8;
border: 1px solid #E9E9E9;
border-radius: 4px;

font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 36px;
letter-spacing: 0.25px;
margin-left: auto;
margin-right: 8px;
`;

export const SearchPlusImage=styled.img`
display:block;
margin:auto;
content: url('/images/plus-button.svg');
width: 20px;
height: 20px;
background: #000094;
object-fit:fill;`;

export const SearchPlusButton=styled.div`
width: 48px;
height: 48px;
background: #000094;
border-radius: 5px;
display: flex;
justify-content: center;`;

export const Button = S.BlueButton;

export const AdvancedSearch = styled.div`
    padding-top: 8px;
    margin-left:auto;
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;

    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #000094;
`;

export const AlertIcon=styled.img`
display:block;
margin:auto;
content: url('/images/alertIcon.svg');
width: 24px;
height: 24px;
background: transparent;
object-fit:fill;`;

export const ErrorHeader=styled.div`
font-family: 'Titillium Web';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
letter-spacing: 0.25px;
color: #262626;
margin-left: 10.25px;
`;

export const ErrorMessage=styled.div`
text-align: left;
margin-top: 12px;
font-family: 'Titillium Web';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 24px;
letter-spacing: 0.25px;
color: #262626;`;