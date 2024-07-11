import React, { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import WorkInProgress from './WorkInProgress';
import { Column } from './common/styles';
import AccountHome from './components/account/AccountHome';
import Provider from './components/account/Provider';
import DashboardPage from './components/dashboard/dashboard_page';
import LcmFinal from './components/dashboard/lcm/LcmFinal';
import LcmServices from './components/dashboard/lcm/LcmServices';
import OntologiesDetailsPage from './components/detailsPage/pages/ontologies/OntologiesDetailsPage';
import OwlGraph from './components/detailsPage/pages/ontologies/components/actions/OwlGraph/OwlGraph';
import ShapesDetailsPage from './components/detailsPage/pages/shapes/ShapesDetailsPage';
import DiscoveryItem from './components/discovery/DiscoveryItem';
import SearchView from './components/discovery/search/SearchView';
import AboutPage from './components/help/AboutPage'
import SupportPage from './components/help/SupportPage'
import LoginFail from './components/login/LoginFail';
import OnboardingPage from './components/onboarding/onboarding_page';
import Participants from './components/participants/Participants';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ProvideAttributes from './components/provide/ProvideAttributes';
import ProvideOverview from './components/provide/ProvideOverview';
import ProvideSelection from './components/provide/ProvideSelection';
import Resources from './components/resources/Resources';
import ServiceOfferings from './components/serviceOfferings/ServiceOfferings';
import Shapes from './components/shapes/Shapes';
import ShapesAndOntologies from './components/shapesAndOntologies/ShapesAndOntologies';
import SolutionPackagingView from './components/solutionPackaging/SolutionPackagingView';
import DetailsPage from './pages/details/DetailsPage';
import Home from './pages/home/Home';

const ViewContainer = (view: ReactNode) => {
  return <div className='body-container'>{view}</div>
}

export const routes = (
  <Column>
    <Routes>
      <Route path="/" element={<Column><Home /></Column>} />
      <Route path="/home" element={ViewContainer(<Home />)} />
      <Route path="/service-offerings" element={ViewContainer(<ServiceOfferings />)} />
      <Route path="/participants" element={ViewContainer(<Participants />)} />
      <Route path="/resources" element={ViewContainer(<ProtectedRoute><Resources /></ProtectedRoute>)} />
      <Route path="/details/:resourceId" element={ViewContainer(<DetailsPage />)} />
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
      <Route path="/shapesAndOntologies" element={ViewContainer(<ShapesAndOntologies />)} />
      <Route path="/shapesAndOntologies/details/*" element={ViewContainer(<OntologiesDetailsPage />)} />
      <Route path="/shapesAndOntologies/graph/*" element={ViewContainer(<OwlGraph />)} />
      <Route path="/shapes" element={ViewContainer(<Shapes />)} />
      <Route path="/shapes/details/*" element={ViewContainer(<ShapesDetailsPage />)} />
    </Routes>
  </Column>
);
