import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import * as S from '../discovery/style';
import { useTranslation } from 'react-i18next';
import Checkbox from '../../common/checkbox';
import { BlueButton, CancelButton, Column, Image, Row, Style } from '../../common/styles';
import DescriptionTab from '../discovery/tabs/description/DescriptionTab';
import PriceTab from '../discovery/tabs/priceTab/PriceTab';
import ScreenshotsTab from '../discovery/tabs/screenshots/ScreenshotsTab';
import ContactTab from '../discovery/tabs/ContactTab/ContactTab';
import TabView from '../tab/TabView';

const ServiceModalDetails = ({service, closeModal, onSelect}) => {

    const {t} = useTranslation();
    const openLink =  (url) => {
        window.open(url, '_blank').focus();
    }

    const showTileHeader = () => {


        return (
            <S.DiscoveryTile>

                <S.DiscoveryTileHeader>
                    <Checkbox type="checkbox" />            
                        <Image src={service.logo} alt="Provider Logo" width='48px' height='48px' />
                    <Style flexGrow='0'>
                        <S.DiscoveryTileFirstRow width={'140px'}>{service.name}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow onClick={()=>openLink(service.ppr_url)}>{service.ppr_name}</S.DiscoveryTileSecondRow>
                    </Style>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.stack")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{service.stack}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.security")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{service.security}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{service.location}</S.DiscoveryTileSecondRow>
                    </div>
                </S.DiscoveryTileHeader>
                
            </S.DiscoveryTile>
        );
    }
   
    const tabLabels =[ t('solution_pkg.details'), 
                        t('solution_pkg.price'), 
                        t('solution_pkg.screenshots'), 
                        t('solution_pkg.contact')];

    const tabViews = [DescriptionTab({ id: service.id, type: 'services'}),
                      PriceTab({ id: service.id, type: 'services' , showButton:false}),
                      ScreenshotsTab({ serviceId: service.id, type: 'services' }),
                      ContactTab({ id: service.id, type: 'services' })];
    return (   
        <Modal width='fit-content'>
            <Column margin="8px 0px 0px 0px">
                {showTileHeader()}
                <TabView labels={tabLabels} views={tabViews} width='864px;'/>
                <Row margin='24px 24px 24px 10px'>
                    <CancelButton onClick={closeModal}>{t('solution_pkg.cancel')}</CancelButton>
                    <BlueButton onClick={()=>{onSelect(service)}}>{t('solution_pkg.select')}</BlueButton>
                </Row>
            </Column>
        </Modal>
    )
}
ServiceModalDetails.propTypes = {
    service: PropTypes.object,
    closeModal: PropTypes.func,
    onSelect: PropTypes.func
}


export default ServiceModalDetails;