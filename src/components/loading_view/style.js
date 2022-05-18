import styled, { css } from 'styled-components';


export const AnimatedVisibility = styled.div`
${(props) => {
  if (props.visible) {
    return css`
    opacity:1;
    /* width:100%; */
    /* height:100%; */
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
  margin: 20px;
  width: 48px;
  height: 48px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`