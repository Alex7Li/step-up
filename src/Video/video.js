import './video.scss'
import { Moves } from '../constants.js'
import face from './face.jpeg'
import { useEffect, useState } from 'react'
import * as ml5 from "ml5";
import * as p5 from '../p5.js'

// import * as ml5 from "ml5";

let video
let classifier
function preload(){
    console.log("Preloading!")
    p5.classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3iU5gtESu/')
    console.log("Preloaded!")
}

function setup() {
    p5.createCanvas(320, 260);
    //   create video
    video = p5.createCapture(VIDEO);
    video.size(320,260);
    video.hide();
}

// STEP 2: CLASSIFY

function draw() {
    p5.background(0);
    p5.image(video, 0,0);

}

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
      {predictions}
    </div>
  );
}

setup();
draw();

export default Video;
