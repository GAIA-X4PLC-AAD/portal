import './App.css';
import React from 'react';
import WorkInProgress from './WorkInProgress';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import Home from './Home';

import LoginFail from './components/login/LoginFail';
import Login from './components/login/Login';
import AccountHome from './components/account/AccountHome';
import ProvideOverview from './components/provide/ProvideOverview';
import Provider from './components/account/Provider';
import Header from './components/header';
import DiscoveryItem from './components/discovery/DiscoveryItem';
import SearchView from './components/discovery/search/SearchView';
import DashboardPage from './components/dashboard/dashboard_page';
import OnboardingPage from './components/onboarding/onboarding_page';
import ProvideAttributes from './components/provide/ProvideAttributes';
import {Column, Padding} from './common/styles';
import Article from './components/article/Article';
import SolutionPackagingView from './components/solutionPackaging/SolutionPackagingView';
import ProvideSelection from './components/provide/ProvideSelection';
import LcmServices from './components/dashboard/lcm/LcmServices';
import LcmFinal from './components/dashboard/lcm/LcmFinal';
import history from "./common/history"
import AboutPage from "./components/help/AboutPage"
import SupportPage from "./components/help/SupportPage"
import {Footer} from "./components/footer/Footer";
import ServiceOfferings from "./components/serviceOfferings/ServiceOfferings";
import Participants from "./components/participants/Participants";
import {useTranslation} from "react-i18next";
import Resources from "./components/resources/Resources";

const App = (props) => {

  const { t, i18n } = useTranslation();

  const ViewContainer = (view) => {
    return <div className='body-container'>{view}</div>
  }

  return (

    <div className=''>
      <div className='main-content'>
        <HistoryRouter history={history}>
          <Header />
          <Column>
            <Routes>
              <Route path="/" element={
                <Column>
                  <Home />
                  {ViewContainer(<Padding vertical='120px'><Article headerMessage="article.what-is-gaiax" category="ARTICLE" /></Padding>)}
                </Column>
              }
              />
              <Route path="/home" element={ViewContainer(<Home />)} />
              <Route path="/service-offerings" element={ViewContainer(<ServiceOfferings />)} />
              <Route path="/participants" element={ViewContainer(<Participants />)} />
              {/*<Route path="/data" element={ViewContainer(<SearchView type="data" />)} />*/}
              <Route path="/resources" element={ViewContainer(<Resources />)} />

              {/*<Route path="/provider" element={ViewContainer(<SearchView type="ppr" />)} />*/}
              <Route path="/services" element={ViewContainer(<SearchView type="services" />)} />
              <Route path="/help" element={ViewContainer(<WorkInProgress component="Help" />)} />
              {/*<Route path="/signin" element={ViewContainer(<LoginHome />)} />*/}
              {/*<Route path="/signin" element={ViewContainer(<Login />)} />*/}
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
              <Route path="/help/about" element={ViewContainer(<AboutPage />)} />
              <Route path="/help/support" element={ViewContainer(<SupportPage />)} />

            </Routes>
          </Column>
        </HistoryRouter>
      </div>
      <Footer />
    </div>

  );
}

export default App;


