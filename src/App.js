import './App.css';
import React, {useEffect, useState} from 'react';
import WorkInProgress from './WorkInProgress';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

import LoginFail from './components/login/LoginFail';
import Login from './components/login/Login';
import AccountHome from './components/account/AccountHome';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ProvideOverview from './components/provide/ProvideOverview';

import { createBrowserHistory } from "history";
import Provider from './components/account/Provider';

import PropTypes from 'prop-types';
import Header from './components/header';
import DiscoveryItem from './components/discovery/DiscoveryItem';
import SearchView from './components/discovery/search/SearchView';
import DashboardPage from './components/dashboard/dashboard_page';
import OnboardingPage from './components/onboarding/onboarding_page';
import ProvideAttributes from './components/provide/ProvideAttributes';
import {BlueButton, Column, Padding} from './common/styles';
import Article from './components/article/Article';
import SolutionPackagingView from './components/solutionPackaging/SolutionPackagingView';
import ProvideSelection from './components/provide/ProvideSelection';
import LcmServices from './components/dashboard/lcm/LcmServices';
import LcmFinal from './components/dashboard/lcm/LcmFinal';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "./common/history"
import AboutPage from "./components/help/AboutPage"
import SupportPage from "./components/help/SupportPage"
import {ApiService} from "./services/ApiService";
import DataList from "./components/discovery/dataList/DataList";
import axios from "axios";
import {Footer} from "./components/footer/Footer";


const App = (props) => {

  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const getDataHandler = async () => {
    setIsLoading(true);
    const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
    const response = await axios.get(API_URL);
    console.log("Response: ", response);
    const data = response.data;
    console.log("Response: ", data);
    const transformedSelfDescriptionData = data.data.map(selfDescriptions => {
      return {
        id: selfDescriptions.survey_id,
        title: selfDescriptions.survey_title,
        description: selfDescriptions.survey_description,
        claimsGraphUri: selfDescriptions.claimsGraphUri,
        close_time: selfDescriptions.survey_close_time,
        creation_time: selfDescriptions.survey_creation_time,
        end_time: selfDescriptions.survey_end_time,
        start_time: selfDescriptions.survey_start_time,
        state: selfDescriptions.survey_state,
        url: selfDescriptions.survey_url,
        uri: selfDescriptions.uri
      };
    })
    console.log("transformedSelfDescriptionData: ", transformedSelfDescriptionData);
    setSelfDescriptionData(transformedSelfDescriptionData);
    setIsLoading(false);
  }
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
                  {ViewContainer(<Article headerMessage="article.what-is-gaiax" category="ARTICLE" />)}
                </Column>
              }
              />
              <Route path="/search" element={
                <div className='body-container'>
                  <BlueButton onClick={getDataHandler}>Get Data</BlueButton>
                  {!isLoading && selfDescriptionData.length > 0 && <DataList data={selfDescriptionData}></DataList>}
                  {selfDescriptionData.length === 0 && <p>No data found...</p>}
                  {isLoading && <p>Loading...</p>}
                </div>
              } />
              <Route path="/data" element={ViewContainer(<SearchView type="data" />)} />
              <Route path="/provider" element={ViewContainer(<SearchView type="ppr" />)} />
              <Route path="/services" element={ViewContainer(<SearchView type="services" />)} />
              <Route path="/help" element={ViewContainer(<WorkInProgress component="Help" />)} />
              <Route path="/signin" element={ViewContainer(<Login />)} />
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


