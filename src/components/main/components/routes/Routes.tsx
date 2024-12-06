/* test coverage not required */
import React, { FC, ReactNode } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import WorkInProgress from '../../../../WorkInProgress';
import Vertical from '../../../../common/components/layouts/Vertical';
import Map from '../../../../common/components/map/Map';
import AccountHome from '../../../account/AccountHome';
import Provider from '../../../account/Provider';
import DashboardPage from '../../../dashboard/dashboard_page';
import LcmFinal from '../../../dashboard/lcm/LcmFinal';
import LcmServices from '../../../dashboard/lcm/LcmServices';
import DiscoveryItem from '../../../discovery/DiscoveryItem';
import SearchView from '../../../discovery/search/SearchView';
import AboutPage from '../../../help/AboutPage'
import SupportPage from '../../../help/SupportPage'
import Home from '../../../home/Home';
import LoginFail from '../../../login/LoginFail';
import OnboardingPage from '../../../onboarding/onboarding_page';
import OntologiesSearchPage from '../../../ontologies/OntologiesSearchPage';
import OntologyDetailsPage from '../../../ontologies/OntologyDetailsPage';
import ParticipantDetails from '../../../participants/ParticipantDetails';
import ParticipantSearchPage from '../../../participants/ParticipantSearchPage';
import ProvideAttributes from '../../../provide/ProvideAttributes';
import ProvideOverview from '../../../provide/ProvideOverview';
import ProvideSelection from '../../../provide/ProvideSelection';
import ResourceDetailsPage from '../../../resources/ResourceDetailsPage';
import ResourceSearchPage from '../../../resources/ResourceSearchPage';
import ServiceOfferingDetails from '../../../serviceOfferings/ServiceOfferingDetails';
import ServiceOfferings from '../../../serviceOfferings/ServiceOfferings';
import ShapeDetailsPage from '../../../shapes/ShapeDetailsPage';
import ShapesSearchPage from '../../../shapes/ShapesSearchPage';
import SolutionPackagingView from '../../../solutionPackaging/SolutionPackagingView';

import styles from './Routes.module.css';
import ProtectedRoute from './components/ProtectedRoute';

const NO_AUTHENTICATION_REQUIRED = false;

/**
 * Wraps the component with all kinds of global configurations.
 *
 * @param view the component which will be wrapped.
 * @param isAuthenticationRequired if it is true, then the page can not be visited if no user is authenticated. Otherwise,
 * the page can be visited without authentication.
 */
const Wrappers = (view: ReactNode, isAuthenticationRequired: boolean = true) => {
  return (
    <ProtectedRoute isAuthenticationRequired={isAuthenticationRequired}>
      {view}
    </ProtectedRoute>
  )
}

const Routes: FC = () => (
  <Vertical className={styles.scrollable}>
    <ReactRoutes>
      <Route path="/" element={Wrappers(<Home/>, NO_AUTHENTICATION_REQUIRED)}/>
      <Route path="/home" element={Wrappers(<Home/>, NO_AUTHENTICATION_REQUIRED)}/>
      <Route path="/vcmap" element={Wrappers(<Map/>)}/>
      <Route path="/service-offerings" element={Wrappers(<ServiceOfferings/>)}/>
      <Route path="/service-offerings/:id" element={Wrappers(<ServiceOfferingDetails/>)}/>
      <Route path="/participants" element={Wrappers(<ParticipantSearchPage/>)}/>
      <Route path="/participants/:participantId" element={Wrappers(<ParticipantDetails/>)}/>
      <Route path="/resources" element={Wrappers(<ResourceSearchPage/>)}/>
      <Route path="/resources/:resourceId" element={Wrappers(<ResourceDetailsPage/>)}/>
      <Route path="/services" element={Wrappers(<SearchView type="services"/>)}/>
      <Route path="/help" element={Wrappers(<WorkInProgress component="Help"/>)}/>
      <Route path="/loginfail" element={Wrappers(<LoginFail/>)}/>
      <Route path="/account/user/:tab" element={Wrappers(<AccountHome/>)}/>
      <Route path="/account/provider/:tab" element={Wrappers(<Provider/>)}/>
      <Route path="/servicetile/:id" element={Wrappers(<DiscoveryItem type="service"/>)}/>
      <Route path="/pprtile/:idd" element={Wrappers(<DiscoveryItem type="ppr"/>)}/>
      <Route path="/datatile/:id" element={Wrappers(<DiscoveryItem type="data"/>)}/>
      <Route path="/admin/participant" element={Wrappers(<SearchView type="participant"/>)}/>
      <Route path="/admin/management" element={Wrappers(<SearchView type="management"/>)}/>
      <Route path="/dashboard" element={Wrappers(<DashboardPage/>)}/>
      <Route path="/onboarding" element={Wrappers(<OnboardingPage/>)}/>
      <Route path="/confirmation/:userType/email_already_confirmed" element={Wrappers(<OnboardingPage/>)}/>
      <Route path="/confirmation/:userType/:confirmationCode" element={Wrappers(<OnboardingPage/>)}/>
      <Route path="/onboarding/:userType/proof" element={Wrappers(<OnboardingPage/>)}/>
      <Route path="/sp/:id" element={Wrappers(<SolutionPackagingView/>)}/>
      <Route path="/provide/start" element={Wrappers(<ProvideSelection/>)}/>
      <Route path="/provide/:type/upload" element={Wrappers(<ProvideOverview/>)}/>
      <Route path="/provide/:type/upload/:id" element={Wrappers(<ProvideOverview/>)}/>
      <Route path="/provide/:type/upload/:id/:mode" element={Wrappers(<ProvideOverview/>)}/>
      <Route path="/provide/:type/confirm/:index" element={Wrappers(<ProvideAttributes/>)}/>
      <Route path="/provide/:type/confirm/:id/:index" element={Wrappers(<ProvideAttributes/>)}/>
      <Route path="/lcm/:id" element={Wrappers(<LcmServices/>)}/>
      <Route path="/lcm/:id/final" element={Wrappers(<LcmFinal/>)}/>
      <Route path="/lcm/:id/:index" element={Wrappers(<LcmServices/>)}/>
      <Route path="/about" element={Wrappers(<AboutPage/>)}/>
      <Route path="/support" element={Wrappers(<SupportPage/>)}/>
      <Route path="/ontologies" element={Wrappers(<OntologiesSearchPage/>)}/>
      <Route path="/ontologies/details/*" element={Wrappers(<OntologyDetailsPage/>)}/>
      <Route path="/shapes" element={Wrappers(<ShapesSearchPage/>)}/>
      <Route path="/shapes/details/*" element={Wrappers(<ShapeDetailsPage/>)}/>
    </ReactRoutes>
  </Vertical>
);

export default Routes;
