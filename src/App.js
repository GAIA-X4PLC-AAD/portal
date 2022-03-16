import './App.css';
import { Suspense } from 'react';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';
import WorkInProgress from './WorkInProgress';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';


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
            <Route path="/register" element={<WorkInProgress component="Register"/>} />
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
