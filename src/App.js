import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';


function App() {
  return (
    <div className="App">
      <LeftMenu />
      <TopMenu />
      <div id="content" className="content"/>
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
