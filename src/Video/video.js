import './video.scss'
import { Moves } from '../constants.js'
import face from './face.jpeg'
import { useEffect, useState } from 'react'
import * as ml5 from "ml5";
import Twilio from "../Twilio/twilio"
// import * as p5 from '../p5.js'

// import * as ml5 from "ml5";

// export default function sketch(p){
//   let canvas;

//   p.setup = () => {
//     canvas = p.createCanvas(300, 200);
//     p.noStroke();

//   }

//   p.draw = () => {
//     p.background('orangered');
//     p.ellipse(150, 100, 100, 100);
//   }

//   p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
//     if(canvas) //Make sure the canvas has been created
//       p.fill(newProps.color);
//   }
// }

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
      {<Twilio/>}
      <img src={ face } id="image" width="400" alt="" />
      {predictions}
    </div>
  );
}

export default Video;
