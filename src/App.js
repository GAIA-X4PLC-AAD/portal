import './App.css';
import { Suspense } from 'react';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';
import WorkInProgress from './WorkInProgress';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Register from './components/Register';
import RegisterUser from './components/RegisterUser';
import RegisterOrganization from './components/RegisterOrganization';
import RegisterMailSent from './components/RegisterMailSent';
import RegisterConfirmation from './components/RegisterConfirmation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LeftMenu />
        <TopMenu />
        <div id="content" className="content">
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
