import './landing.css';
import { Pages } from '../constants.js'

function Landing(props) {
  const {setCurPage} = props

  const goToDancePage = () => {
      setCurPage(Pages.DancePage)
  }

  return (
    <div>
        <h2>
            Step up and dance!
        </h2>
        <form>
        <input type="button" value="get dancing!" onClick={goToDancePage}/>
        </form>
    </div>
  );
}

export default Landing;
