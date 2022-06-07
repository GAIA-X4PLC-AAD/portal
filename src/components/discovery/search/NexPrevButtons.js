import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import * as S from './style';
import {  updatePageNumber } from "../../../actions";

const NextPrevButtons = ({data}) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const dispatch = useDispatch();

    // Change searchCriteriaStore increasing value
    const onNextButtonClick = () => {
        dispatch(updatePageNumber(criteria.page  + 1 ));
    }
    // Change searchCriteriaStore decreasing value
    const onPrevButtonClick = () => {
        dispatch(updatePageNumber(criteria.page - 1 ));
    }

    // Shows or not Next button
    const showNext = () => {
        if (data.next && data.next.length>0) { 
            return (<S.Button onClick={onNextButtonClick}>Next</S.Button>);
        }
    }

    // Shows or not previous button
    const showPrev = () => {
        if (data.prev && data.prev.length>0) {
            return (<S.Button onClick={ onPrevButtonClick}>Prev</S.Button>);
        }
    }
    if (!data) return null;
    return (<>
    {showPrev()}
    {showNext()}
    </>);
}

NextPrevButtons.propTypes = {
    data: PropTypes.object
};


export default NextPrevButtons;