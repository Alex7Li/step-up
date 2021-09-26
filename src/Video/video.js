import './video.scss'
// import face from './face.jpeg'
import  Sketchy  from "../sketches/sketch.js";
import { useEffect, useState } from 'react'
import * as ml5 from "ml5";
import Twilio from "../Twilio/twilio"

function Video(props) {
  const [predictions, setPredictions] = useState([])
  // your id is random digits
  const [my_id, _] = useState((Math.random() + 1).toString(36).substring(7))
  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    // const image = document.getElementById('image');
    // // Make a prediction with a selected image
    // classifier.predict(image, 5, function (err, results) {
    //   return results
    // }).then((results) => {
    //     const classes = results.map(x=>x.className)
    //     // Set the predictions in the state
    //     setPredictions(classes)
    //   })
  }

  // once the component is mounted, start the classification
  useEffect(() => {
    classifyImg();
  }, []) 

  // First set the predictions to a default value while loading
  let predictionView = (<div className="loader"></div>);
  // Map over the predictions and return each prediction with probability
  if(predictions.length > 0){
      predictionView = predictions.map((pred, i) => {
        return (
          <div key={ i + "" }>{ i+1 }. Prediction: {pred} </div>
        )
      })
  }

  return (
    <div>     
      {/* <img src={ face } id="image" width="400" alt="" /> */}
      {<Twilio setCurPage={props.setCurPage}/>}
      {<Sketchy setScore={props.setScore} score={props.score} my_id={my_id} move={props.move}/>}
      {predictions}
    </div>
  );
}

export default Video;
