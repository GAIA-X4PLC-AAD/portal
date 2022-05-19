import styled from 'styled-components';

export const ContactCategory = styled.div`
    font-family: 'TeleNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #4B4B4B;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 0px;
`;

export const ContactValue = styled.div`
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #1C0E15;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 0px;
`;

export const Contact = styled.div`
    margin: 20px;
    flex: 1;
    text-align: left;
    width: 174px;
`;
export const ContactsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    grid-gap: 10px;
    max-width: 450px;
`;

export const ContactsContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
