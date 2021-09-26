import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Pages } from '../constants.js';
import Video from '../Video/video.js';
import '../Landing/landing.css';
import { Button } from '../Landing/Button'

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
    <div className='hero-container'>
      <video className='video-bg' src='/videos/lasers.mp4' autoPlay loop muted />
      <p>
        Dance Move: {moveList[currentMoveInd]}
      </p>
      {<Video/>}
      {/* <input type="button" value="go back" onClick={goToLandingPage}/> */}
      {/* <div class="fab-container">
        <div class="fab fab-icon-holder">
          <i class="fas fa-play"></i>
        </div>
        <ul class="fab-options">
          <li>
            <button id="button-join" onClick={joinRoom} >
              <span class="fab-label">Join Room</span>
              <div class="fab-icon-holder">
                <i class="fas fa-music"></i>
              </div>
              </button>
          </li>
          <li>
            <span class="fab-label">Disconnect</span>
            <div class="fab-icon-holder">
              <i class="fas fa-sign-out"></i>
            </div>
          </li>
          <li>
            <button value="go back" onClick={goToLandingPage}>
              <span class="fab-label">Go Back</span>
              <div class="fab-icon-holder">
                <i class="fas fa-arrow-left"></i>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          value="go back"
          onClick={goToLandingPage}
        >
          Go Back
        </Button>
      </div> */}
    </div>
  );
}

export default Dance;