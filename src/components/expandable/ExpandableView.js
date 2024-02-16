import React, { useState } from 'react';
import * as S from './style.js';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Down from './down.js';
import { Style } from '../../common/styles.js';


const ExpandableView = ({
    initiallyExpanded,
    view,
    title,
    hidden = false,
    border = false,
    elevation = false,
    titleTrailerPadding = '30px',
    titleLeadingPadding = '0px',
    viewLeadingPadding = '0px',
    arrowColor = '#000094',
    width = 'auto',
    maxWidth1,
    borderBottom=true,
    shiftedBottomBorder=false,
    boxShadow,
    margin='12px 0px'
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);


    const exapandableContent = () => {
        if (isExpanded) return view;
    }

    return <S.Block margin={margin} border={border} boxShadow={boxShadow} width={width} display={hidden?'none':''}>

        {/* TITLE */}
        <S.ToggleButton
            onClick={() => { setIsExpanded(!isExpanded) }}
            $noBorder={border}
            $background={elevation}>
            <Style $flexGrow={1} $paddingLeft={titleLeadingPadding}>{title}</Style>
            {/* {title} */}
            <Down isOpen={isExpanded} paddingRight={titleTrailerPadding} arrowColor={arrowColor} />
        </S.ToggleButton>

        {/* BODY */}
        <Style $borderBottom={borderBottom} $shiftedBottomBorder={shiftedBottomBorder}
               $overflow={'hidden'}>
            <Collapse isOpened={isExpanded}>
                <Style
                    maxWidth={maxWidth1}
                    borderTop={border}
                    paddingLeft={viewLeadingPadding}>
                    {exapandableContent()}
                </Style>
            </Collapse>
        </Style>
    </S.Block>;
}

ExpandableView.propTypes = {
    initiallyExpanded: PropTypes.bool.isRequired,
    title: PropTypes.element.isRequired,
    view: PropTypes.element.isRequired,
    hidden: PropTypes.bool,
    border: PropTypes.bool,
    elevation: PropTypes.bool,
    titleTrailerPadding: PropTypes.string,
    titleLeadingPadding: PropTypes.string,
    viewLeadingPadding: PropTypes.string,
    arrowColor: PropTypes.string,
    boxShadow: PropTypes.string,
    width: PropTypes.string,
    maxWidth1: PropTypes.string,
    borderBottom: PropTypes.bool,
    shiftedBottomBorder: PropTypes.bool,
    margin: PropTypes.string
}

export default ExpandableView
