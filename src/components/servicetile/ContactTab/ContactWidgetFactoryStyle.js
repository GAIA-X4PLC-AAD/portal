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
    flex: 2;
`;
export const ContactsContainer = styled.div`
    display: grid;
    --grid-layout-gap: 10px;
    --grid-column-count: 4;
    --grid-item--min-width: 100px;

    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
    --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
    grid-gap: var(--grid-layout-gap);
`;


export const ContactsContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
