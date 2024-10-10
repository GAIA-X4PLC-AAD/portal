import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Dimmer = styled.div`
height: 100%;
width: 100%;
position: fixed;
background-color: rgba(128,128,128,0.35);
left: 0;
top: 0;
z-index: 20;
`;

const ModalDiv = styled.div`
display: flex!important;
background-color: white;
margin: auto;
margin-top: 80px;
width: ${props => props.width || '50%'};
-webkit-box-flex: 0;
box-shadow: 1px 3px 3px 0 rgb(0 0 0 / 20%), 1px 3px 15px 2px rgb(0 0 0 / 20%);
border-radius: 0.3rem;
will-change: top, left, margin, transform, opacity;
overflow: auto;
&& ::after, ::before {
    box-sizing:  inherit;

}
`;

/**
 * Please use the typescript version of this modal {@link Modal}
 */
const DeprecatedModal = props => {
  return ReactDOM.createPortal(
    <Dimmer onClick={props.onDismiss}>
      <ModalDiv onClick={(e)=> e.stopPropagation()} {...props}>
        {props.children}
      </ModalDiv>
    </Dimmer>,
    document.querySelector('#modal')
  );

};

export default DeprecatedModal;
