import './dance.scss';
import Video from '../Video/video.js'
import { Pages, Moves } from '../constants.js'
import { useState } from 'react';

function Dance(props) {
  const setCurPage = props.setCurPage
  const moveList = props.moveList

  const goToLandingPage = () => {
    setCurPage(Pages.LandingPage)
  }

  const [currentMoveInd, setCurrentMoveInd] = useState(0)

  // TODO: Change the move every few seconds.
  // const setInterval = () => {
  //   setCurrentMoveInd(currentMoveInd + 1 % moveList.length, 3000)
  // };
  
  return (
    <div>
      <p>
        Dance Move: {moveList[currentMoveInd]}
      </p>
      {<Video/>}
      <input type="button" value="go back" onClick={goToLandingPage}/>
    </div>
  );
}

export default Dance;