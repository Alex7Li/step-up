import './landing.scss';
import { Pages, Moves, Songs, getSongFromName } from '../constants.js'
import { useEffect } from 'react';
import useSound from 'use-sound';
import drum_sprites from '../Songs/drum_sprites.mp3'

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
    setMoveList([Moves.Floss, Moves.NaeNae, Moves.Twerk])
  }, [setMoveList, setSong])

  const goToDancePage = () => {
    play({ id: 'snare' })
    setCurPage(Pages.DancePage)
  }

  const selectSong = (e) => {
    const songName = e.target.value;
    setSong(getSongFromName(songName))
  }
  return (
    <div>
      <h2>
        Step up and dance!
      </h2>
      <form>
        <label>Select the song to play:</label>
        <div onChange={selectSong}>
          <input type="radio" value={Songs.IronPyrite} name="song select" /> Iron Pryite
          <input type="radio" value={Songs.Sparrow} name="song select" /> Sparrow
          <input type="radio" value={Songs.Circles} name="song select" /> Circles
        </div>
        <input className="dancebutton" type="button" value="get dancing!" onClick={goToDancePage} />
      </form>
    </div>
  );
}

export default Landing;
