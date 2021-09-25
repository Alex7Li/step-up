import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Pages } from '../constants.js';
import Video from '../Video/video.js';
import './dance.scss';

function Dance(props) {
  const setCurPage = props.setCurPage
  const moveList = props.moveList
  const [play, { stop }] = useSound(props.song)

  const goToLandingPage = () => {
    setCurPage(Pages.LandingPage)
  }

  const [currentMoveInd, setCurrentMoveInd] = useState(0)

  // Play/Pause the song when loading/leaving the page.
  useEffect(() => {
    play()
    return () => {
      stop()
    }
  }, [play, stop])

  // Change the move every few seconds.
  useEffect(() => {
    const interval = setInterval(() => {
     setCurrentMoveInd((currentMoveInd + 1) % moveList.length)
    }, 3000);
    return () => clearInterval(interval);
  });

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