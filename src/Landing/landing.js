import './landing.scss';
import { Pages } from '../constants.js'

function Landing(props) {
  const setCurPage = props.setCurPage

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
