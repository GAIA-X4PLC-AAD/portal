import React from "react";
import ReactDOM from 'react-dom';
import "./Modal.css";

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="dimmer">
            <div onClick={(e)=> e.stopPropagation()} className="modal">
                {props.children}
            </div>
        </div>,
        document.querySelector('#modal')
    );

};

export default Modal;