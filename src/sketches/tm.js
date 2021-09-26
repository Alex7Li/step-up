import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
import * as p5 from 'p5'
import * as ml5 from "ml5";
import * as tmPose from '@teachablemachine/pose';

class TM extends React.Component {
    pose;
    posenetOutput;

	setup = (p5, parentRef) => {
		p5.createCanvas(520, 360);
        // this.video = p5.createCapture(Twilio.Video);
        // this.video = p5.createCapture(p5.VIDEO);
        this.URL = "../Model/my-pose-model";
        this.modelURL = this.URL + "model.json"
        this.metadataURL = this.URL + "metadata.json";
        this.model = tmPose.load(this.modelURL, this.metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        this.size = 200;
        this.flip = true; // whether to flip the webcam
        this.webcam = new tmPose.Webcam(this.size, this.size, this.flip); // width, height, flip
        this.webcam.setup(); // request access to the webcam
        this.webcam.play();
        window.requestAnimationFrame(this.loop);

        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.size; this.canvas.height = this.size;
        this.ctx = this.canvas.getContext("2d");
        this.labelContainer = document.getElementById("label-container");
        for (let i = 0; i < this.maxPredictions; i++) { // and class labels
            this.labelContainer.appendChild(document.createElement("div"));
        }
        
        // this.video.hide();

        // this.video.size(200,200);
	};

    loop =(timestamp) => {
        this.webcam.update(); // update the webcam frame
        this.predict();
        this.window.requestAnimationFrame(this.loop);
    }

    predict =() => {
        const { pose, posenetOutput } = this.model.estimatePose(this.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        this.prediction = this.model.predict(posenetOutput);

        for (let i = 0; i < this.maxPredictions; i++) {
            const classPrediction =
                this.prediction[i].className + ": " + this.prediction[i].probability.toFixed(2);
            this.labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        this.drawPose(pose);
    }
    
    drawPose = (pose) => {
        if (this.webcam.canvas) {
            this.ctx.drawImage(this.webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
            }
        };
    }

	draw = (p5) => {
		// p5.background(0);
        // p5.tint(100,50,150);
        // p5.translate(this.video.width, 0);
        // //then scale it by -1 in the x-axis
        // //to flip the image
        // p5.scale(-1, 1);
        // p5.image(this.video, 0, 0, p5.width, p5.height);
        
	};

	render() {
		return (
			<div className="App">
				<h1>react-p5</h1>
				<Sketch setup={this.setup} draw={this.draw} preload={this.preload} />
			</div>
		);
	}
}
export default TM