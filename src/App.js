import './App.css';
import TopMenu from './TopMenu';
import WorkInProgress from './WorkInProgress';
import { Link, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Search from "./Search";
import Register from './components/Register';
import RegisterUser from './components/RegisterUser';
import RegisterOrganization from './components/RegisterOrganization';
import RegisterMailSent from './components/RegisterMailSent';
import RegisterViaDID from './components/RegisterViaDID';
import RegisterViaDIDIdP from './components/RegisterViaDIDIdP';
import RegisterConfirmation from './components/RegisterConfirmation';
import LoginFail from './components/login/LoginFail';
import Login from './components/login/Login';
import { useTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import RegisterDisplayVC from './components/RegisterDisplayVC';
import RegisterComplianceCheck from './components/RegisterComplianceCheck';
import { createBrowserHistory } from "history";


const App = (props) => {
  const { t, i18n } = useTranslation();
  const history = createBrowserHistory();  

  return (
 
    <div className="App">
      <Router history={history}>
      <div id="content" className="content">
        <div className='home-top-border'></div>
        <TopMenu />
        <div className='home-screen'>
          <div className='banner-container' hidden={props.isInSignInMenu}>
            <div className='banner-content'>
              <div className='banner-logo'>
                <img src='images/logo_white.svg' height='80px' width='200px'></img>
              </div>
              <h1>{t('article.what-is-new')}</h1>
              <h4>{t('filler')}</h4>
              <div className='banner-slider'>
              </div>
            </div>
          </div>
          <div className='search-container' hidden={props.isInSignInMenu}>
            <div>
              <Search/>
            </div>
          </div>
          <div className='body-container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<WorkInProgress component="Services"/>} />
            <Route path="/data" element={<WorkInProgress component="Data"/>} />
            <Route path="/provider" element={<WorkInProgress component="Provider"/>} />
            <Route path="/help" element={<WorkInProgress component="Help"/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/register/user" element={<RegisterUser/>}/>
            <Route path="/register/organization" element={<RegisterOrganization/>}/>
            <Route path="/confirmation/:type/:key" element={<RegisterConfirmation/>}/>
            <Route path="/register/email" element={<RegisterMailSent/>}/>
            <Route path="/register/did" element={<RegisterViaDID/>}/>
            <Route path="/register/IdP" element={<RegisterViaDIDIdP/>}/>
            <Route path="/register/displayVC" element={<RegisterDisplayVC/>}/>
            <Route path="/register/compliance" element={<RegisterComplianceCheck/>}/>
            <Route path="/signin" element={<Login/>} />
            <Route path="/loginfail" element={<LoginFail />} />
          </Routes>
          </div>
          <div className='footer-container'>
            <div className='footer-flex-col'>
            <div className='footer-banner'>
              <img src='images/logo_white.svg' height='50px' ></img>
              <p>{t('footer_slogan_cap')}</p>
            </div>
            <div className='footer-content'>
               2020 Deutsche Telekom IoT GmbH
              <div>
                <a href='#'>{t('links.imprint')}</a>
                <a href='#'>{t('links.privacy')}</a>
                <a href='#'>{t('links.policy')}</a>
                <a href='#'>{t('links.cookie_settings')}</a>
                <a href='#'>{t('links.terms_and_conditions')}</a>
                <a href='#'>{t('links.contact')}</a>
                <Link to="/help">{t('links.help')}</Link>
              </div>
            </div>
            <div className='footer-bottom'>
              <p>{t('footer_business_only')}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      </Router>
    </div>

  );
}

const mapStateToProps = state => {
  return {isInSignInMenu: state.signin.isInSignInMenu };
};

export default connect( mapStateToProps,{}) (App);;

