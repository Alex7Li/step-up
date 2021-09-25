import './dance.scss';
import Video from '../Video/video.js'
import { Pages } from '../constants.js'

function Dance(props) {
  const {setCurPage} = props

  const goToLandingPage = () => {
    setCurPage(Pages.LandingPage)
  }

  return (
    <div>
      {Video()}
      <input type="button" value="go back" onClick={goToLandingPage}/>
    </div>
  );
}

export default Dance;