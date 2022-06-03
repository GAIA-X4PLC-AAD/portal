
import React, { useState } from 'react';

import * as S from './style';
import PropTypes from 'prop-types';

import { Collapse } from 'react-collapse';
import Down from './down';
import { Style } from '../../common/styles';


const ExpandableView = ({ initiallyExpanded, view, title, border = false }) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
    return (
        <>
            <S.Block border={border}>
                {/* TITLE */}
                <S.ToggleButton onClick={() => { setIsExpanded(!isExpanded) }} noBorder={border}
                horizontalPadding='40px'
                >
                    {title}
                    <Down isOpen={isExpanded} />
                </S.ToggleButton>
                {/* BODY */}
                <Collapse isOpened={isExpanded}>
                    <Style borderTop={border}>{view}</Style>
                </Collapse>
            </S.Block>
        </>
    );
}

ExpandableView.propTypes = {
    initiallyExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    view: PropTypes.object.isRequired,
    border: PropTypes.bool,
}

export default ExpandableView