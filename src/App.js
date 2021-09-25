import './App.css';
import React, { useState } from 'react';
import Landing from './Landing/landing.js'
import DancePage from './Dance/dance.js'
// import * as p5 from './p5.js'
import { Pages, Moves } from './constants.js'
import pyrite from './Songs/Lemaitre - Iron Pyrite.mp3'

// import P5Wrapper from 'react-p5-wrapper';
// import sketch from './Video/video.js';

function App() {
  const [curPage, setCurPage] = useState(Pages.LandingPage)
  const [moveList, setMoveList] = useState([Moves.Floss, Moves.NaeNae, Moves.Twerk])
  const [song, setSong] = useState(pyrite)
  const [color, setColor] = useState([Math.random()*255, Math.random()*255, Math.random()*255])

  return (
    <div className="App">
      <header></header>
      {curPage === Pages.LandingPage && <Landing setCurPage={setCurPage} setMoveList={setMoveList} setSong={setSong}/>}
      {curPage === Pages.DancePage && <DancePage setCurPage={setCurPage} moveList={moveList}song={song}/>}
      {/* <P5Wrapper sketch={sketch} color={color}></P5Wrapper> */}
    </div>
  );
}

export default App;
