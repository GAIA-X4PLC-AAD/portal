import styled from 'styled-components';

export const Columns = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: ${props => (props.justifyContent ? props.justifyContent : 'space-between')};
    order: 0;
    flex-grow: 0;
`;
