import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ExpandableView from "../expandable/ExpandableView";
import * as S from './style';
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../actions";

const AdminFilterView = ({ data }) => {

    const [filters, setFilters] = useState([]);
    const dispatch = useDispatch();

    // updates redux filterCriteria every 1s if something has been changed. When there is a change in between, will wait 1s again
    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(updateFilterCriteria(filters));
        }, 1000);
        return () => {
            clearTimeout(timerId);
        }
    }, [filters]);

    // update state of current filters
    const onFormChanged = (a) => {
        if (a.target.checked === true) {
            setFilters([...filters, { key: a.target.name, value: a.target.value }]);

        } else {
            setFilters(filters.filter(({ key, value }) => { return !(key === a.target.name && value === a.target.value) }));
        }
    }

    const showItemsList = (name, items) => {
        return (
            // returning as a single component, instead as an array (otherwise, will cause ExpandableView to its `view` to issue a console warning)
            <>
                {
                    (items.map((item) => {
                        return (
                            <S.Column key={item.name} >
                                <S.CheckBox type="checkbox" name={name} value={item.name} defaultChecked={false} onChange={onFormChanged} key={name} />
                                <S.CheckBoxText>{item.name}</S.CheckBoxText>
                                <S.Rounded>{item.qty}</S.Rounded>
                            </S.Column>
                        );
                    }))
                }
            </>
        )
    };
    const showCategoryHeader = (name) => {
        return <S.Category>{name}</S.Category>;
    }

    const showCategories = (data) => {
        return (data.categories.map((cat, i) => {
            return <ExpandableView
                initiallyExpanded={true}
                border={true}
                arrowColor={'#737373'}
                elevation={true}
                boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}
                titleTrailerPadding={'12px'}
                view={showItemsList(cat.name, cat.items)}
                title={showCategoryHeader(cat.name)} key={cat.name} />
        }))
    }

    // check when data is null
    if (data === undefined) return null;
    return <>
        <S.Filters>
            {showCategories(data)}
        </S.Filters>
    </>
}

AdminFilterView.propTypes = {
    data: PropTypes.object
};

export default AdminFilterView;