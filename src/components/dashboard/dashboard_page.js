import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Row, Style, CaptionText, Circle, CaptionTextLink } from '../../common/styles';
import { Padding } from '../discovery/tabs/style';

import DashboardView from './dashboard_view';
import DateTimeCard from './date_time_card';
import SideSectionsView from './side_sections_view';

const DashboardPage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user)
  const role = user.user.user_role
  const type = 'dashboard';
  const _leftPanelWidth = '225px'
  const navigate = useNavigate();

  const SideBarView = () => {
    const ProviderDetails = () => {
      if (user.user.user_role === 'gaiax-ppr') {
        return <>
          <Row>
            <CaptionText>{t('dashboard.organization_subtitle')}</CaptionText>
          </Row>
          <Row>
            <CaptionTextLink onClick={() => { navigate('/account/provider/details') }}>
              {user.user.organization_name}
            </CaptionTextLink>
          </Row>
        </>
      } else {
        return null;
      }
    }

    const _welcomeView = <>
      <Row data-tag='welcome-view' width='225px'>
        <Circle radius='50px'>{user.user.first_name[0] + user.user.family_name[0]}</Circle>
        <Padding horizontal='8px'>
          <Row>
            {t('dashboard.welcome')}
          </Row>
          <Row>
            {user.user.first_name} {user.user.family_name}
          </Row>
          <ProviderDetails />
        </Padding>
      </Row>
    </>

    return <>
      {_welcomeView}
      <DateTimeCard />
      <SideSectionsView />
    </>
  }

  return <Row>

    {/* SIDE BAR */}
    <Style minWidth={_leftPanelWidth}>
      <SideBarView />
    </Style>

    {/* BODY VIEW */}
    <Padding horizontal='12px' />
    <Style minWidth='900px'>
      <DashboardView type={type} />
    </Style>
  </Row>;

}

DashboardPage.propTypes = {
  type: PropTypes.string
}

export default DashboardPage;
