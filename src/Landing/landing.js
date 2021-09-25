import './landing.scss';
import { Pages, Moves } from '../constants.js'
import { useEffect } from 'react';

function Landing(props) {
  const setCurPage = props.setCurPage
  const setMoveList = props.setMoveList
  useEffect(() => {
    setMoveList([Moves.Floss, Moves.NaeNae, Moves.Twerk])
  }, [])

  const goToDancePage = () => {
      setCurPage(Pages.DancePage)
  }

  return (
    <div>
        <h2>
            Step up and dance!
        </h2>
        <form>
        <input className="dancebutton" type="button" value="get dancing!" onClick={goToDancePage}/>
        </form>
    </div>
  );
}

export default Landing;
