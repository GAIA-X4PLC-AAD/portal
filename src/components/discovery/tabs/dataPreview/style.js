import styled from 'styled-components';
import * as S from '../../../../common/styles';

export const Preview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    width: ${props => props.width || '304px'};
    min-height: ${props => props.minHeight || '480px'};
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    flex: none;
    order: 1;
    flex-grow: 0;
    /* margin: 5px; */
`;

export const PreviewImage = styled.img`
width: 280px;
height: 187px;

flex: none;
order: 0;
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
`;

export const Subline = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.15px;
    color: #000000;
    text-align: left;
`;

export const Description = styled.div`
    margin-top:10px;
    margin-bottom:10px;
    font-family: 'Titillium Web';
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
`;

export const Button = styled(S.BlueButton)`
    margin-top:auto;
`;
