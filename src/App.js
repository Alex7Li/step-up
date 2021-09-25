import './App.css';
import React, { useState } from 'react';
import Landing from './Landing/landing.js'
import DancePage from './Dance/dance.js'
// import * as p5 from './p5.js'
import { Pages, Moves } from './constants.js'
import pyrite from './Songs/Lemaitre - Iron Pyrite.mp3'

function App() {
  const [curPage, setCurPage] = useState(Pages.LandingPage)
  const [moveList, setMoveList] = useState([Moves.Floss, Moves.NaeNae, Moves.Twerk])
  const [song, setSong] = useState(pyrite)

  return (
    <div className="App">
      <header></header>
      {curPage === Pages.LandingPage && <Landing setCurPage={setCurPage} setMoveList={setMoveList} setSong={setSong}/>}
      {curPage === Pages.DancePage && <DancePage setCurPage={setCurPage} moveList={moveList}song={song}/>}
    </div>
  );
}

export default App;
