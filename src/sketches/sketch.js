import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
// import * as p5 from 'p5'
import * as ml5 from "ml5";
import { model } from '@tensorflow/tfjs-layers';
import { fill } from '@tensorflow/tfjs-core';
// import "p5/lib/addons/p5.dom";
// import './styles.css';

class Sketchy extends React.Component {
	// y = 0;
	// direction = '^';
    // const canvas;
    // let video;
    pose = null;
    preload = (p5) => {
        // this.URL = "../Model/my-pose-model/";
        // this.modelURL = this.URL + "model.json"
        // this.metadataURL = this.URL + "metadata.json";
        // this.classifier = ml5.poseNet(this.modelURL, this.modelReady);
    } 
	setup = (p5, parentRef) => {
        // this.video = p5.createCapture(Twilio.Video);
        p5.createCanvas(500, 360).parent(parentRef);
        this.video = p5.createCapture(p5.VIDEO);
        
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, this.modelReady);
        this.poseNet.on('pose', this.poseNetOn)
        // let options = {
        //     input: 34,
        //     output: 2,
        //     task: 'classification'
        // }

        // this.brain = ml5.neuralNetwork(options);
        // this.classifier.on('pose', this.poseNetOn);

        // this.video.size(200,200);
	};
    modelReady = () => {
        console.log("poseNet Loaded!");
    }

    poseNetOn = (poses) => {
        // console.log(poses);
        if(poses.length > 0){
            // console.log('got pose')
            this.pose = poses[0].pose;
        }
    }

	draw = (p5) => {
		p5.background(0);
        // p5.background(0);
		// p5.fill(255, this.y * 1.3, 0);
		// p5.ellipse(p5.width / 2, this.y, 50);
		// if (this.y > p5.height) this.direction = '';
		// if (this.y < 0) {
		// 	this.direction = '^';
		// }
		// if (this.direction === '^') this.y += 8;
		// else this.y -= 4;
        // p5.tint(170,170,255);
        p5.translate(p5.width, 0);
        // //then scale it by -1 in the x-axis
        // //to flip the image
        p5.scale(-1, 1);
        p5.image(this.video, 0, 0, p5.width, p5.height);
        
        // if(!this.pose){
        //     console.log(this.pose)
        // }
        // console.log(JSON.stringify(this.pose))
        if (this.pose) {
            // for (let i = 0; i < skeleton.length; i++) {
            //   let a = skeleton[i][0];
            //   let b = skeleton[i][1];
            //   strokeWeight(2);
            //   stroke(0);
        
            //   line(a.position.x, a.position.y, b.position.x, b.position.y);
            // }
            console.log("pose exists!")
            for (let i = 0; i < this.pose.keypoints.length; i++) {
              let x = this.pose.keypoints[i].position.x;
              let y = this.pose.keypoints[i].position.y;
              p5.fill(255,255,255);
              p5.stroke(255,0,0);
              p5.ellipse(x - 60, y, 10);
            // //   console.log(x,y)
            }
          }
        
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