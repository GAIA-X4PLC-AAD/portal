// import tw, { styled, css } from "twin.macro";
import styled, { css } from 'styled-components';



export const AnimatedVisibility = styled.div`
${(props) => {
    if (props.visible) {
      return css`
    opacity:1;
    width:100%;
    height:100%;
    transition: width 0.5s, height 0.5s, opacity 0.5s 0.5s;
  `;
    } else {
      return css`
    opacity:0;
    width:0;
    height:0;
    transition: width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s;
  `;
    }

  }}
`

export const CircularLoader = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`


export const Block = styled.div`
  /* border: 1px solid #ccc; */
  margin: 12px 0px;
  width: 100%;
  border: ${props => props.border ? '1px solid #E9E9E9' : ''};
  border-radius: 4px;
  /* min-height: 40%; */
`

export const ToggleButton = styled.div`
  font-size: 1em;
  border-bottom: ${props => props.noBorder ? '' : '1px solid #E9E9E9'};
  /* border-bottom: ${props => props.border ? '1px solid #E9E9E9' : ''}; */
  border-radius: 4px;
  box-shadow: none;
  padding: 8px 0px;
  /* padding: ${props => props.horizontalPadding || '20px'}; */
  /* margin: 0px ${props => props.horizontalPadding || '0px'}; */
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: black;
`
export const Arrow = styled.div`
  padding-right: 5px;
  align-self: center;
`;