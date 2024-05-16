import React from 'react';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';

import AboutPage from "./components/help/AboutPage"
import AccountHome from './components/account/AccountHome';
import DiscoveryItem from './components/discovery/DiscoveryItem';
import LoginFail from './components/login/LoginFail';
import WorkInProgress from './WorkInProgress';
import ProvideOverview from './components/provide/ProvideOverview';
import Provider from './components/account/Provider';
import SearchView from './components/discovery/search/SearchView';
import DashboardPage from './components/dashboard/dashboard_page';
import OnboardingPage from './components/onboarding/onboarding_page';
import ServiceOfferings from "./components/serviceOfferings/ServiceOfferings";
import Participants from "./components/participants/Participants";
import Resources from "./components/resources/Resources";
import Navbar from 'components/navbar/Navbar';
import SolutionPackagingView from './components/solutionPackaging/SolutionPackagingView';
import ProvideAttributes from './components/provide/ProvideAttributes';
import ProvideSelection from './components/provide/ProvideSelection';
import LcmServices from './components/dashboard/lcm/LcmServices';
import LcmFinal from './components/dashboard/lcm/LcmFinal';
import history from "./common/history"
import SupportPage from "./components/help/SupportPage"
import Home from './pages/home/Home';
import DetailsPage from 'pages/details/DetailsPage';
import ProtectedRoute from 'components/protectedRoute/ProtectedRoute';
import {Column} from './common/styles';
import {Footer} from "./components/footer/Footer";

import './App.css';
import ShapesAndOntologies from "./components/shapesAndOntologies/ShapesAndOntologies";

const App = (props) => {

  const ViewContainer = (view) => {
    return <div className='body-container'>{view}</div>
  }

  return (
    <div className='App'>
      <div className='main-content'>
        <HistoryRouter history={history}>
          <Navbar />
          <Column>
            <Routes>
              <Route path="/" element={
                <Column>
                  <Home />
                </Column>
              }
              />
              <Route path="/home" element={ViewContainer(<Home />)} />
              <Route path="/service-offerings" element={ViewContainer(<ServiceOfferings />)} />
              <Route path="/participants" element={ViewContainer(<Participants />)} />
              <Route path="/resources" element={ViewContainer(
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>)} />
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
              <Route path="/about" element={ViewContainer(
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>)} />
              <Route path="/support" element={ViewContainer(
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>)} />
              <Route path="/shapesAndOntologies" element={ViewContainer(
              <ProtectedRoute>
               <ShapesAndOntologies />
              </ProtectedRoute>)} />
            </Routes>
          </Column>
        </HistoryRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;


