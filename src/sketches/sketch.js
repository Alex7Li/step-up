import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
// import * as p5 from 'p5'
import * as ml5 from "ml5";
// import "p5/lib/addons/p5.dom";
// import './styles.css';

class Sketchy extends React.Component {
	// y = 0;
	// direction = '^';
    // const canvas;
    // let video;
    preload = (p5) => {
        this.URL = "../Model/my-pose-model";
        this.modelURL = this.URL + "model.json"
        this.metadataURL = this.URL + "metadata.json";
        this.classifier = ml5.poseNet(this.modelURL, this.modelReady);
    } 
	setup = (p5, parentRef) => {
		p5.createCanvas(520, 360).parent(parentRef);
        // this.video = p5.createCapture(Twilio.Video);
        this.video = p5.createCapture(p5.VIDEO);

        this.video.hide();

        this.classifier.on('pose', this.poseNetOn);

        // this.video.size(200,200);
	};
    modelReady = () => {
        console.log("poseNet Loaded!");
    }

    poseNetOn =(stream) => {
        console.log("poseNet Listening!");
    }

	draw = (p5) => {
		p5.background(0);
        p5.tint(100,50,150);
        p5.translate(this.video.width, 0);
        //then scale it by -1 in the x-axis
        //to flip the image
        p5.scale(-1, 1);
        p5.image(this.video, 0, 0, p5.width, p5.height);
        
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
export default Sketchy