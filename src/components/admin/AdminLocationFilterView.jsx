import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ExpandableView from "../expandable/ExpandableView";
import * as S from './style';
import { useTranslation } from "react-i18next";

const AdminLocationFilterView = ({ data , header, onFormChanged}) => {
    
    const {t} = useTranslation();

    const showItemsList = (name, items) => {
        return (
            // returning as a single component, instead as an array (otherwFise, will cause ExpandableView to its `view` to issue a console warning)
            <>
                {
                    (items.map((item) => {
                        return (
                            <S.Column key={item.name} >
                                <S.CheckBox type="checkbox" name={name} value={item.loc_code} defaultChecked={false} onChange={onFormChanged} 
                                    key={name} 
                                    data-tip={t('discovery.search.tooltip.category_item')}
                                    />
                                <S.CheckBoxText>{item.name}</S.CheckBoxText>
                                <S.Rounded>{item.qty}</S.Rounded>
                            </S.Column>
                        );
                    }))
                }
            </>
        )
    };
    const showCategoryHeader = () => {
        return <S.Category>{t("admin.location")}</S.Category>;
    }

    const showCategories = (data) => {
            return (<ExpandableView
                initiallyExpanded={true}
                border={true}
                arrowColor={'#737373'}
                elevation={true}
                boxShadow={'0px 2px 4px 0px rgb(29 36 48 / 12%)'}
                titleTrailerPadding={'12px'}
                view={showItemsList('location', data.items)}
                title={showCategoryHeader()} key="location"/>)
    }

    // check when data is null
    if (data === undefined) return null;
    return <>
        <S.Filters>
            {showCategories(data, header)}
        </S.Filters>
    </>
}

AdminLocationFilterView.propTypes = {
    data: PropTypes.object,
    header: PropTypes.string,
    onFormChanged: PropTypes.func.isRequired
};

export default AdminLocationFilterView;