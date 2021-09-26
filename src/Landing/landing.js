import React, { useState } from 'react';
import { Pages, Moves, Songs, getSongFromName } from '../constants.js'
import { useEffect } from 'react';
import useSound from 'use-sound';
import drum_sprites from '../Songs/drum_sprites.mp3'
import { Button } from './Button'
import '../App.css';
import './landing.css';
import firebase from '../util/firebase'

function Landing(props) {
  const setCurPage = props.setCurPage
  const setMoveList = props.setMoveList
  const setSong = props.setSong
  const [play] = useSound(drum_sprites, {
    sprite: {
      kick: [0, 350],
      hihat: [374, 160],
      snare: [666, 290],
      cowbell: [968, 200],
    }
  });

  useEffect(() => {
    setMoveList([Moves.Floss, Moves.NaeNae, Moves.Disco])
  }, [setMoveList, setSong])

  const goToDancePage = (e) => {
    play({ id: 'snare' })
    setCurPage(Pages.DancePage)
    const songName = e.target.value;
    setSong(getSongFromName(songName))
    console.log(songName)
  }

  const [value, setTitle] = useState('');
  const [metricsList, setMetricsList] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  }

  const updateCounts = () => {
    console.log("In update log")
    const countRef = firebase.database().ref("Metrics")

    let count = 0;
    countRef.on("value", (snapshot) => {
      const metrics = snapshot.val();
      console.log(metrics)
      for ( let value in metrics) {
        console.log("value: " + value)
        console.log("metrics[value]: " + metrics[value])
        count = Number(metrics[value]) + 1;
        console.log("metrics[value]+1: " + count);
      }
    });


    countRef.update({
      value: Number(count)
    });
  }

  useEffect(() => {
    const countRef = firebase.database().ref("Metrics");
    countRef.on("value", (snapshot) => {
      const metrics = snapshot.val();
      const metricsList = [];
      for (let id in metrics) {
        metricsList.push(metrics[id]);
      }
      setMetricsList(metricsList);
    });



  }, []);


  return (
  //   <div>
  //     <h2>
  //       Step up and dance!
  //     </h2>
  //     <form>
  //       <label>Select the song to play:</label>
  //       <div onChange={selectSong}>
  //         <input type="radio" value={Songs.IronPyrite} name="song select" /> Iron Pryite
  //         <input type="radio" value={Songs.Sparrow} name="song select" /> Sparrow
  //         <input type="radio" value={Songs.Circles} name="song select" /> Circles
  //       </div>
  //       <input className="dancebutton" type="button" value="get dancing!" onClick={goToDancePage} />
  //     </form>
  //   </div>
  // );
  <div className='hero-container'>
      <video className='video-bg' src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>Twerk Out to Work Out!</h1>
      <p>Select a song to dance:</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          value={Songs.IronPyrite}
          onClick={goToDancePage}
        >
          Iron Pryite
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          value={Songs.Sparrow}
          onClick={goToDancePage}
        >
          Sparrow
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          value={Songs.Circles}
          onClick={goToDancePage}
        >
          Circles
        </Button>
      </div>
      {/* <input type="number" onChange={handleOnChange} value={title} /> */}
      {/* <button onClick={updateCounts}>Add Counts</button> */}
      {/* <div className='hero-container'>
        {metricsList ? metricsList.map((metrics) => <p>Metrics: {metrics.title}</p>) : ''}
      </div> */}
    </div>
  );
}

export default Landing;
