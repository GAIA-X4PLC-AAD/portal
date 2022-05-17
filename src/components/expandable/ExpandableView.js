
import React, { useState } from 'react';

import * as S from './style';
import PropTypes from 'prop-types';


import { Collapse } from 'react-collapse';
import Down from './down';


const ExpandableView = ({ initiallyExpanded, view, title }) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
    return (
        <>
            <S.Block>
                <S.ToggleButton onClick={() => { setIsExpanded(!isExpanded) }}>
                    <span>{title}</span>
                    <Down isOpen={isExpanded} />
                </S.ToggleButton>
                <Collapse isOpened={isExpanded}>
                    {view}
                </Collapse>
            </S.Block>
        </>
    );
}

ExpandableView.propTypes = {
    initiallyExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    view: PropTypes.object.isRequired,
}

export default ExpandableView