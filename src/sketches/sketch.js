import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
import * as p5 from 'p5'
import * as ml5 from "ml5";
import { model } from '@tensorflow/tfjs-layers';
import { fill } from '@tensorflow/tfjs-core';
import { setDeprecationWarningFn } from '@tensorflow/tfjs-core/dist/tensor';
import { isPropertySignature } from 'typescript';
import firebase from '../util/firebase'
import {disco_w, disco_b, cancan_w, cancan_b, floss_w, floss_b} from '../constants'

// import "p5/lib/addons/p5.dom";
// import './styles.css';

class Sketchy extends React.Component {
	// y = 0;
	// direction = '^';
    // const canvas;
    // let video;
    pose = null;
    skeleton = null;
    state = 'waiting';
    targetLabel = null;
    str = ""

    preload = (p5) => {

    } 
	setup = (p5, parentRef) => {
        // this.video = p5.createCapture(Twilio.Video);
        p5.createCanvas(500, 360).parent(parentRef);
        this.video = p5.createCapture(p5.VIDEO);
        
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, this.modelReady);
        this.poseNet.on('pose', this.poseNetOn)

        // this.flossNet = ml5.neuralNetwork(options)
	};
    modelReady = () => {
        console.log("poseNet Loaded!");
    }

    updateCounts = () => {
        console.log("In update log")
        const countRef = firebase.database().ref("Metrics")

        let count = 0;
        countRef.on("value", (snapshot) => {
        const metrics = snapshot.val();
        console.log(metrics)
        for ( let value in metrics) {
            console.log("value: " + value)
            console.log("metrics[value]: " + metrics[value])
            count = Number(metrics[value]) + 1;
            console.log("metrics[value]+1: " + count);
        }
    });


    countRef.update({
      value: Number(count)
      
    });
  }
    poseNetOn = (poses) => {
        // console.log(poses);
        if(poses.length > 0){
            // const fs = require('fs')
            this.pose = poses[0].pose;
            this.skeleton = poses[0].skeleton;
            // window.alert(JSON.stringify(this.pose))
            this.props.setScore(this.props.score + 1)
        }
    }

	draw = (p5) => {
		p5.background(0);

        p5.translate(p5.width, 0);

        p5.scale(-1, 1);
        p5.image(this.video, 0, 0, p5.width, p5.height);
        
        if (this.pose) {
            for (let i = 0; i < this.skeleton.length; i++) {
              let a = this.skeleton[i][0];
              let b = this.skeleton[i][1];
              p5.strokeWeight(6);
              p5.stroke(0,0,255);
        
              p5.line(a.position.x - 60, a.position.y - 40, b.position.x-50, b.position.y - 40);
            }
            
            for (let i = 0; i < this.pose.keypoints.length; i++) {
              let x = this.pose.keypoints[i].position.x;
              let y = this.pose.keypoints[i].position.y;
              p5.fill(255,255,255);
              p5.strokeWeight(2);
              p5.stroke(255,0,0);
              p5.ellipse(x - 70, y - 50, 10);

            }
          }
        
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
export default Sketchy