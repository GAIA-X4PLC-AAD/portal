import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import Navbar from './common/components/navbar/Navbar';
import history from './common/history'
import { Footer } from './components/footer/Footer';
import Routes from './components/routes/Routes';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <div className='main-content'>
        <HistoryRouter history={history}>
          <Navbar />
          <Routes/>
        </HistoryRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
