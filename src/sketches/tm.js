import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
import * as p5 from 'p5'
import * as ml5 from "ml5";
import * as tmPose from '@teachablemachine/pose';

class TM extends React.Component {
    
    async init(){
        this.URL = "../Model/my-pose-model/";
        this.modelURL = this.URL + "model.json";
        // console.log(this.modelURL)
        this.metadataURL = this.URL + "metadata.json";
        this.model = ml5.poseNet('https://teachablemachine.withgoogle.com/models/3iU5gtESu/', this.modelReady);
        this.maxPredictions = 2;

        this.size = 200;
        this.flip = true; // whether to flip the webcam
        this.webcam = new tmPose.Webcam(this.size, this.size, this.flip); // width, height, flip
        await this.webcam.setup(); // request access to the webcam
        await this.webcam.play();
        window.requestAnimationFrame(this.loop);

        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.size; this.canvas.height = this.size;
        this.ctx = this.canvas.getContext("2d");
        this.labelContainer = document.getElementById("label-container");
        for (let i = 0; i < this.maxPredictions; i++) { // and class labels
            this.labelContainer.appendChild(document.createElement("div"));
        }
    }
    
    pose;
    posenetOutput;

	setup = (p5, parentRef) => {
		p5.createCanvas(520, 360);
        this.init();
	};

    modelReady = () => {
        console.log("poseNet Loaded!");
    }

    async loop(timestamp) {
        this.webcam.update(); // update the webcam frame
        await this.predict();
        this.window.requestAnimationFrame(this.loop);
    }

    async predict(){
        const { pose, posenetOutput } = await this.model.estimatePose(this.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        this.prediction = await this.model.predict(posenetOutput);

        for (let i = 0; i < this.maxPredictions; i++) {
            const classPrediction =
                this.prediction[i].className + ": " + this.prediction[i].probability.toFixed(2);
            this.labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        this.drawPose(pose);
    }
    
    drawPose(pose){
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
        // // p5.tint(100,50,150);
        // // p5.translate(this.video.width, 0);
        // // //then scale it by -1 in the x-axis
        // // //to flip the image
        // // p5.scale(-1, 1);
        // p5.image(this.webcam, 0, 0, this.size, this.size);
        
	};

	render() {
		return (
			<div className="App">
				<h1>react-p5</h1>
				<Sketch setup={this.setup} draw={this.draw}/>
			</div>
		);
	}
}
export default TM