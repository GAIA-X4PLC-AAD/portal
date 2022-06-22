import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const RadioWrapper = styled.div`
  display: inline-block;
`;

const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 1px solid #000094;
  width: 14px;
  height: 14px;
  left: 0;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #000094;
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 110ms;
  }
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 10px;
      height: 10px;
      opacity: 1;
      left: 15%;
      top: 15%;
    }
  }
`;

const Label = styled.label`
  display: flex;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  position: relative;
  align-items: center;
  ${props =>
        props.disabled &&
        `
        cursor: not-allowed;
        opacity: 0.4;
    `}
`;

const RadioButton = ({ name, children }) => (
    <RadioWrapper>
        <Label>
            <Input name={name} type="radio" />
            <Mark />
            {children}
        </Label>
    </RadioWrapper>
);

RadioButton.propTypes = {
    name: PropTypes.string,
    children: PropTypes.object
};

export default RadioButton;
