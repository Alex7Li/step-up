import './video.scss'
import { Moves } from '../constants.js'
import face from './face.jpeg'
import  Sketchy  from "../sketches/sketch.js";
import { useEffect, useState } from 'react'
import * as ml5 from "ml5";
import Twilio from "../Twilio/twilio"

function Video() {
  const [predictions, setPredictions] = useState([])
  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('image');
    // Make a prediction with a selected image
    classifier.predict(image, 5, function (err, results) {
      return results
    }).then((results) => {
        const classes = results.map(x=>x.className)
        // Set the predictions in the state
        setPredictions(classes)
      })
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
      <img src={ face } id="image" width="400" alt="" />
      {<Twilio/>}
      {<Sketchy/>}
      {predictions}
    </div>
  );
}

export default Video;
