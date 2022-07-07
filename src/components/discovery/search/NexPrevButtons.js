import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from "react-redux";
import PropTypes from 'prop-types';
import * as S from './style';
import ReactPaginate from 'react-paginate';
import { updatePageNumber } from "../../../actions";
import { ArrowLeft, ArrowRight, DropDownArrowDown } from '../../../common/styles';


const NextPrevButtons = ({ data }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const dispatch = useDispatch();

    const itemsPerPage = 15

    if (!data) return null;

    const handlePageClick = (event) => {
        dispatch(updatePageNumber(Math.max(1, event.selected)))
      };

    return <ReactPaginate
        initialPage={criteria.page}
        breakLabel="..."
        nextLabel={<><ArrowRight /></>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={itemsPerPage}
        previousLabel={<><ArrowLeft /></>}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
}

NextPrevButtons.propTypes = {
    data: PropTypes.object
};


export default NextPrevButtons;