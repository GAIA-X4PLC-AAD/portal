import './App.css';
import { Suspense } from 'react';
import TopMenu from './TopMenu';
import WorkInProgress from './WorkInProgress';
import { Link, BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Search from "./Search";
import Register from './components/Register';
import RegisterUser from './components/RegisterUser';
import RegisterOrganization from './components/RegisterOrganization';
import RegisterMailSent from './components/RegisterMailSent';
import RegisterConfirmation from './components/RegisterConfirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div id="content" className="content">
        <div className='home-top-border'></div>
        <TopMenu />
        <div className='home-screen'>
          <div className='banner-container'>
            <div className='banner-content'>
              <div className='banner-logo'>
                <img src='images/logo_white.svg' height='80px' width='200px'></img>
              </div>
              <h1>What's new</h1>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor posuere nec id purus turpis enim ornare dapibus vitae. Sit arcu sodales dui lectus varius magna turpis imperdiet. Bibendum amet enim aenean tincidunt diam faucibus. Tortor libero quis est feugiat mattis lorem. Dignissim aliquam amet eget etiam auctor facilisi nisl.</h4>
              <div className='banner-slider'>
              </div>
            </div>
          </div>
          <div className='search-container'>
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
            <Route path="/signin" element={<WorkInProgress component="Sign in"/>} />
          </Routes>
          </div>
          <div className='footer-container'>
            <div className='footer-flex-col'>
            <div className='footer-banner'>
              <img src='images/logo_white.svg' height='50px' ></img>
              <p>ERLEBEN, WAS VERBINDET.</p>
            </div>
            <div className='footer-content'>
               2020 Deutsche Telekom IoT GmbH
              <div>
                <a href='#'>Imprint</a>
                <a href='#'>Privacy</a>
                <a href='#'>Policy</a>
                <a href='#'>Cookie Settings</a>
                <a href='#'>Terms & Conditions</a>
                <a href='#'>Contact</a>
                <Link to="help">Help</Link>
              </div>
            </div>
            <div className='footer-bottom'>
              <p>Gaia-X - For business customers only</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="..... is loading">
      <App />
   </Suspense>
  );

};
