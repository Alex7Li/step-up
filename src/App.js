import './App.css';
import React, { useState } from 'react';
import Landing from './Landing/landing.js'
import DancePage from './Dance/dance.js'
import { Pages } from './constants.js'
import * as p5 from './p5.js'

function App() {
  const [curPage, setCurPage] = useState(Pages.LandingPage)

  return (
    <div className="App">
      <header></header>
      {curPage === Pages.LandingPage && <Landing setCurPage={setCurPage}/>}
      {curPage === Pages.DancePage && <DancePage setCurPage={setCurPage}/>}
    </div>
  );
}

export default App;
