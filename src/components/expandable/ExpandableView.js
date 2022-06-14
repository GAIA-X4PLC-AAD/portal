
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
    titleTrailerPadding = '30px',
    titleLeadingPadding = '0px',
    viewLeadingPadding = '0px',
    arrowColor = '#000094',
    width = 'fit-content',
    boxShadow,
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);


    const exapandableContent = () => {
        if (isExpanded) return view;
    }

    return <S.Block border={border} boxShadow={boxShadow} width={width}>
        {/* TITLE */}
        <S.ToggleButton

            onClick={() => { setIsExpanded(!isExpanded) }}
            noBorder={border}
            background={elevation}
            horizontalPadding='40px'>
            <Style flexGrow={1} paddingLeft={titleLeadingPadding}>{title}</Style>
            <Down isOpen={isExpanded} paddingRight={titleTrailerPadding} arrowColor={arrowColor} />
        </S.ToggleButton>
        {/* BODY */}
        <Style borderBottom={true}>
            <Collapse isOpened={isExpanded}>
                <Style
                    borderTop={border}
                    paddingLeft={viewLeadingPadding}
                    elevation={elevation}
                >{exapandableContent()}</Style>
            </Collapse>
        </Style>
    </S.Block>;
}

ExpandableView.propTypes = {
    initiallyExpanded: PropTypes.bool.isRequired,
    title: PropTypes.element.isRequired,
    view: PropTypes.element.isRequired,
    border: PropTypes.bool,
    elevation: PropTypes.bool,
    titleTrailerPadding: PropTypes.string,
    titleLeadingPadding: PropTypes.string,
    viewLeadingPadding: PropTypes.string,
    arrowColor: PropTypes.string,
    boxShadow: PropTypes.string,
    width: PropTypes.string
}

export default ExpandableView