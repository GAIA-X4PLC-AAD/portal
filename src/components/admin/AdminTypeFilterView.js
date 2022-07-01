import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ExpandableView from "../expandable/ExpandableView";
import * as S from './style';
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../actions";
import { useTranslation } from "react-i18next";

const AdminTypeFilterView = ({ data , header, onFormChanged}) => {
    
    const {t} = useTranslation();

    const showItemsList = (name, items) => {
        return (
            // returning as a single component, instead as an array (otherwise, will cause ExpandableView to its `view` to issue a console warning)
            <>
                {
                    (items.map((item) => {
                        return (
                            <S.Column key={item.name} >
                                <S.CheckBox type="checkbox" name={name} value={item.name} defaultChecked={false} onChange={onFormChanged} key={name} />
                                <S.CheckBoxText>{t(`admin.${item.name}`)}</S.CheckBoxText>
                                <S.Rounded>{item.qty}</S.Rounded>
                            </S.Column>
                        );
                    }))
                }
            </>
        )
    };
    const showCategoryHeader = (name) => {
        return <S.Category>{t(`admin.${name}`)}</S.Category>;
    }

    const showCategories = (data, header) => {
            return (<ExpandableView
                initiallyExpanded={true}
                border={true}
                arrowColor={'#737373'}
                elevation={true}
                boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}
                titleTrailerPadding={'12px'}
                view={showItemsList(header, data.items)}
                title={showCategoryHeader(header)} key={header} />)
    }

    // check when data is null
    if (data === undefined) return null;
    return <>
        <S.Filters>
            {showCategories(data, header)}
        </S.Filters>
    </>
}

AdminTypeFilterView.propTypes = {
    data: PropTypes.object,
    header: PropTypes.string,
    onFormChanged: PropTypes.func
};

export default AdminTypeFilterView;