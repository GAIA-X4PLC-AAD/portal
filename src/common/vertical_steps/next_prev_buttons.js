import React, { useEffect, useState } from "react";
import { Padding } from "../../components/discovery/tabs/style";
import { ButtonText, Image, Style } from "../styles";
import PropTypes from 'prop-types';
const NextPrevButtons = ({ next, previous, goToSlide, padding='32px', bottom='500px', right='', top='', position='relative', ...rest }) => {
    const activeColor = 'invert(14%) sepia(71%) saturate(5805%) hue-rotate(243deg) brightness(56%) contrast(132%)'
    const disabledColor = 'invert(74%) sepia(0%) saturate(1%) hue-rotate(3deg) brightness(96%) contrast(95%)'
    const { carouselState: { currentSlide } } = rest;
    return (
        <Style display='flex' position={position} justifyContent='end' bottom={bottom} top={top} right={right}>
            <Padding horizontal={padding}>
                <ButtonText disabled={currentSlide === 0} onClick={() => previous()} >
                    <Image src='/images/arrow_left.svg' alt="arrow-left" width='12px'
                        filter={currentSlide === 0 ? disabledColor : activeColor} />
                </ButtonText></Padding>
            <Padding horizontal='4px'>
                <ButtonText disabled={currentSlide !== 0} onClick={() => next()} >
                    <Image src='/images/arrow_right.svg' alt="arrow-right" width='12px'
                        filter={currentSlide !== 0 ? disabledColor : activeColor}
                    />
                </ButtonText></Padding>
        </Style>

    );
};

NextPrevButtons.propTypes = {
    next: PropTypes.func,
    previous: PropTypes.func,
    goToSlide: PropTypes.func,
    padding: PropTypes.string,
    bottom: PropTypes.string,
    right: PropTypes.string,
    top: PropTypes.string,
    position: PropTypes.string,
};

export default NextPrevButtons;