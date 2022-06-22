import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BlueLinkText, Style } from '../../../common/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateFilterCriteria } from '../../../actions';

const SearchSort = ({type}) => {

    const {t} = useTranslation();
    const criteria = useSelector(state => state.searchCriteriaStore);
    const [direction, setDirection] = useState(criteria.sort_direction || 'ASC');
    const dispatch = useDispatch();
    
    useEffect (()=> {
        if (direction != criteria.sort_direction)
            dispatch(updateFilterCriteria({ sort_direction: direction }));
    }, [direction]);
    
    const changeSortDirection = () =>{
        switch (direction) {
            case 'ASC': 
                setDirection('DESC');
                break;
            case 'DESC': 
                setDirection('ASC');
                break;
        }
    }

//    if (!(type === 'management' || type === 'participant')) return null;
    return (
        <Style marginLeft='auto' marginRight='0' maxWidth='fit-content'> <BlueLinkText onClick={changeSortDirection}>{t(`admin.sort-direction-${direction}`)} </BlueLinkText></Style>
    );

}
SearchSort.propTypes = {
    type: PropTypes.string
}

export default SearchSort;