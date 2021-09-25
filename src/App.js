import './App.css';
import React, { useState } from 'react';
import Landing from './Landing/landing.js'
import DancePage from './Dance/dance.js'
import { Pages } from './constants.js'

function App() {
  const [curPage, setCurPage] = useState(Pages.LandingPage)
  const [moveList, setMoveList] = useState(Pages.LandingPage)

  return (
    <div className="App">
      <header></header>
      {curPage === Pages.LandingPage && <Landing setCurPage={setCurPage} setMoveList={setMoveList}/>}
      {curPage === Pages.DancePage && <DancePage setCurPage={setCurPage} moveList={moveList}/>}
    </div>
  );
}

export default App;
