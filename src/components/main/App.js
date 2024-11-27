import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import history from '../../common/history'
import Routes from './components/routes/Routes';
import { Footer } from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

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
