import styled from 'styled-components';

export const DiscoveryTile = styled.div`
    display: flex;
    flex-direction: column;
    background: ${ props => props.isComposite ? 'url(/images/vertical_lines.png)' : ''};
    background-repeat: no-repeat;
    width: 864px;
    /* width: 95%; */
`;

