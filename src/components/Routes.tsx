import React, { FC, ReactNode } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import WorkInProgress from '../WorkInProgress';
import { Column } from '../common/styles';
import Home from '../pages/home/Home';

import AccountHome from './account/AccountHome';
import Provider from './account/Provider';
import DashboardPage from './dashboard/dashboard_page';
import LcmFinal from './dashboard/lcm/LcmFinal';
import LcmServices from './dashboard/lcm/LcmServices';
import OntologiesDetailsPage from './detailsPage/pages/ontologies/OntologiesDetailsPage';
import ResourceDetailsPage from './detailsPage/pages/resources/ResourceDetailsPage';
import ShapesDetailsPage from './detailsPage/pages/shapes/ShapesDetailsPage';
import DiscoveryItem from './discovery/DiscoveryItem';
import SearchView from './discovery/search/SearchView';
import AboutPage from './help/AboutPage'
import SupportPage from './help/SupportPage'
import LoginFail from './login/LoginFail';
import OnboardingPage from './onboarding/onboarding_page';
import Ontologies from './ontologies/Ontologies';
import ParticipantDetails from './participants/ParticipantDetails';
import ParticipantSearchPage from './participants/ParticipantSearchPage';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import ProvideAttributes from './provide/ProvideAttributes';
import ProvideOverview from './provide/ProvideOverview';
import ProvideSelection from './provide/ProvideSelection';
import ResourceSearchPage from './resources/ResourceSearchPage';
import ServiceOfferings from './serviceOfferings/ServiceOfferings';
import Shapes from './shapes/Shapes';
import SolutionPackagingView from './solutionPackaging/SolutionPackagingView';

const ViewContainer = (view: ReactNode) => {
  // @ts-ignore
  return <div className='body-container'>{view}</div>
}

const Routes: FC = () => (
  <Column>
    <ReactRoutes>
      <Route path="/" element={<Column><Home /></Column>} />
      <Route path="/home" element={ViewContainer(<Home />)} />
      <Route path="/service-offerings" element={ViewContainer(<ProtectedRoute><ServiceOfferings/></ProtectedRoute>)}/>
      <Route path="/participants" element={ViewContainer(<ParticipantSearchPage/>)}/>
      <Route path="/participants/:participantId" element={ViewContainer(<ParticipantDetails/>)}/>
      <Route path="/resources" element={ViewContainer(<ProtectedRoute><ResourceSearchPage/></ProtectedRoute>)}/>
      <Route path="/resources/:resourceId"
        element={ViewContainer(<ProtectedRoute><ResourceDetailsPage/></ProtectedRoute>)}/>
      <Route path="/services" element={ViewContainer(<SearchView type="services" />)} />
      <Route path="/help" element={ViewContainer(<WorkInProgress component="Help" />)} />
      <Route path="/loginfail" element={ViewContainer(<LoginFail />)} />
      <Route path="/account/user/:tab" element={ViewContainer(<AccountHome />)} />
      <Route path="/account/provider/:tab" element={ViewContainer(<Provider />)} />
      <Route path="/servicetile/:id" element={ViewContainer(<DiscoveryItem type="service" />)} />
      <Route path="/pprtile/:idd" element={ViewContainer(<DiscoveryItem type="ppr" />)} />
      <Route path="/datatile/:id" element={ViewContainer(<DiscoveryItem type="data" />)} />
      <Route path="/admin/participant" element={ViewContainer(<SearchView type="participant" />)} />
      <Route path="/admin/management" element={ViewContainer(<SearchView type="management" />)} />
      <Route path="/dashboard" element={ViewContainer(<DashboardPage />)} />
      <Route path="/onboarding" element={ViewContainer(<OnboardingPage />)} />
      <Route path="/confirmation/:userType/email_already_confirmed" element={ViewContainer(<OnboardingPage />)} />
      <Route path="/confirmation/:userType/:confirmationCode" element={ViewContainer(<OnboardingPage />)} />
      <Route path="/onboarding/:userType/proof" element={ViewContainer(<OnboardingPage />)} />
      <Route path="/sp/:id" element={ViewContainer(<SolutionPackagingView />)} />
      <Route path="/provide/start" element={ViewContainer(<ProvideSelection />)} />
      <Route path="/provide/:type/upload" element={ViewContainer(<ProvideOverview />)} />
      <Route path="/provide/:type/upload/:id" element={ViewContainer(<ProvideOverview />)} />
      <Route path="/provide/:type/upload/:id/:mode" element={ViewContainer(<ProvideOverview />)} />
      <Route path="/provide/:type/confirm/:index" element={ViewContainer(<ProvideAttributes />)} />
      <Route path="/provide/:type/confirm/:id/:index" element={ViewContainer(<ProvideAttributes />)} />
      <Route path="/lcm/:id" element={ViewContainer(<LcmServices />)} />
      <Route path="/lcm/:id/final" element={ViewContainer(<LcmFinal />)} />
      <Route path="/lcm/:id/:index" element={ViewContainer(<LcmServices />)} />
      <Route path="/about" element={ViewContainer(<ProtectedRoute><AboutPage /></ProtectedRoute>)} />
      <Route path="/support" element={ViewContainer(<ProtectedRoute><SupportPage /></ProtectedRoute>)} />
      <Route path="/ontologies" element={ViewContainer(<Ontologies />)} />
      <Route path="/ontologies/details/*" element={ViewContainer(<OntologiesDetailsPage />)} />
      <Route path="/shapes" element={ViewContainer(<Shapes />)} />
      <Route path="/shapes/details/*" element={ViewContainer(<ShapesDetailsPage />)} />
    </ReactRoutes>
  </Column>
);

export default Routes;
