import './dance.scss';
import { Pages } from '../constants.js'

function Dance(props) {
  const {setCurPage} = props
 
  const goToLandingPage = () => {
    setCurPage(Pages.LandingPage)
  }

  return (
    <div>
        <h2>
            A video of yourself dancing.
        </h2>
        <input type="button" value="go back" onClick={goToLandingPage}/>
    </div>
  );
}

export default Dance;