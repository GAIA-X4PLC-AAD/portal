import styled from 'styled-components';

export const DiscoveryTile = styled.div`
    display: flex;
    flex-direction: column;
    background: ${ props => props.isComposite ? 'url(/images/vertical_lines.png)' : ''};
    background-repeat: no-repeat;
    width: 864px;
    /* width: 95%; */
`;

export const DiscoveryTileHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const DiscoveryTileFirstRow = styled.div`
    font-family: Titillium Web;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: left;
    width: ${props => props.width || ''};
    /* width: 140px; */
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
`;

export const DiscoveryTileSecondRow = styled.div`
    font-family: Titillium Web;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.4000000059604645px;
    text-align: left;
`;

export const DiscoveryDetailsButton = styled.div`
    font-family: Titillium Web;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: center;
    color: #000094;
    margin-top: auto;
    margin-bottom: auto;
`;

export const DiscoveryDetailsContent = styled.div`
    display: block;
`;

export const DiscoveryTileContent = styled.div`
    display: flex;
    flex-direction: row;
`;

export const DiscoveryDetailsBody = styled.div`
    padding: 0.5em 0.5em;
    /* width:100%; */
`;

export const DiscoveryDetailsNav = styled.div`
     display: flex;
    flex-direction: column;
    justify-content: space-around;
  `;

export const VerticalBar = styled.div`
    border-left: 4px solid green;
    height: 100%;
    padding: 0px;
    margin: 0px;
    width: 1px;
`;
