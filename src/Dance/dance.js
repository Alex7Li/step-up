import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Pages } from '../constants.js';
import Video from '../Video/video.js';
import '../Landing/landing.css';
import { Button } from '../Landing/Button'
import firebase from '../util/firebase'

function Dance(props) {
  const setCurPage = props.setCurPage
  const moveList = props.moveList
  const [play, { stop }] = useSound(props.song)
  const [score, setScore] = useState(0)
  const [otherScore, setOtherScore] = useState(0)
  const [movesLeft, setMovesLeft] = useState(3)

  useEffect(() => {
    const countRef = firebase.database().ref("Metrics")
    console.log("ah")
    countRef.on("value", (snapshot) => {
      const metrics = snapshot.val();
      console.log(metrics);
      let anotherScore = score;
      for (let value in metrics) {
        if(metrics[value] !== score){
          anotherScore = metrics[value];
        }
      }
      setOtherScore(anotherScore);
    });
    // return countRef.off();
  }, [score]);

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
     if (movesLeft == 0) {
       goToLandingPage()
     } else {
      setMovesLeft(movesLeft - 1)
     }
    }, 10000);
    return () => clearInterval(interval);
  });

  return (
    <div className='hero-container'>
      <video className='video-bg' src='/videos/lasers.mp4' autoPlay loop muted />
      <p>
        Dance Move: {moveList[currentMoveInd]}
      </p>
      <p>Your score: {score}</p>
      <p>Opponent score: {otherScore}</p>
      <p>Moves Left: {movesLeft}</p>
      {<Video setScore={setScore} score={score} move={moveList[currentMoveInd]}/>}
      {/* <input type="button" value="go back" onClick={goToLandingPage}/> */}
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
      </div>
    </div>
  );
}

export default Dance;
