import styled from 'styled-components';

import * as S from '../../../../common/styles';

export const Preview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    width: ${props => props.width || '304px'};
    min-height: ${props => props.minHeight || '480px'};
    margin: ${props => props.margin || '0'};
    margin-right: ${props => props.marginRight || '0'};
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    flex: none;
    order: 1;
    flex-grow: 0;
    /* margin: 5px; */
`;

export const PreviewImage = styled.img`
    width: 100%;
    height: 187px;
    max-width: 100%;
    flex: none;
    order: 0;
    object-fit: cover;
    flex-grow: 0;
`;

export const Headline = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.25px;
    color: #000000;
    text-align: left;
    overflow-wrap: anywhere;
`;

export const Subline = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.15px;
    color: #000000;
    text-align: left;
    overflow-wrap: anywhere;
`;

export const Description = styled.div`
    margin-top:10px;
    margin-bottom:10px;
    font-family: 'Titillium Web',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #2A2A2A;
`;

export const Logo = styled.img`
width: 60px;
height: 60px;
margin-top: 12px;
/* margin: 5px; */

order: 0;
flex-grow: 0;
`;
export const Columns = styled.div`
    display: flex;
    flex-flow: row wrap;
    order: 0;
    flex-grow: 0;
`;

export const Rows = styled.div`
    display: flex;
    flex-flow: column wrap;
    order: 0;
    flex-grow: 0;
    margin-top:12px;
    width: ${props => props.width || 'auto'};
`;

export const Button = styled(S.BlueButton)`
    margin-top:auto;
`;
