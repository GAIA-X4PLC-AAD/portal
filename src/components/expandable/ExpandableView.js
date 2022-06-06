
import React, { useState } from 'react';

import * as S from './style';
import PropTypes from 'prop-types';

import { Collapse } from 'react-collapse';
import Down from './down';
import { Style } from '../../common/styles';


const ExpandableView = ({
    initiallyExpanded,
    view,
    title,
    border = false,
    elevation = false,
    trailerPadding = '40px',
    titleLeadingPadding = '0px',
    viewLeadingPadding = '0px',
    arrowColor = '#000094',
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
    return (
        <>
            <S.Block border={border} elevation={elevation}>
                {/* TITLE */}
                <S.ToggleButton
                    onClick={() => { setIsExpanded(!isExpanded) }}
                    noBorder={border}
                    background={elevation}
                    horizontalPadding='40px'
                >
                    <Style flexGrow={1} paddingLeft={titleLeadingPadding}>{title}</Style>
                    <Down isOpen={isExpanded} paddingRight={trailerPadding} arrowColor={arrowColor} />
                </S.ToggleButton>
                {/* BODY */}
                <Collapse isOpened={isExpanded}>
                    <Style
                        borderTop={border}
                        paddingLeft={viewLeadingPadding}
                        elevation={elevation}>{view}</Style>
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
    elevation: PropTypes.bool,
    trailerPadding: PropTypes.string,
    titleLeadingPadding: PropTypes.string,
    viewLeadingPadding: PropTypes.string,
    arrowColor: PropTypes.string,
}

export default ExpandableView