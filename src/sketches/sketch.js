// let video

// function setup() {
//     createCanvas(320, 260);
//     //   create video
//     video = createCapture(VIDEO);
//     video.size(320,260);
//     video.hide();
// }

// // STEP 2: CLASSIFY

// function draw() {
//     background(0);
//     image(video, 0,0);

// }
import React from 'react';
// import ReactDOM from 'react-dom';
import Twilio from "../Twilio/twilio"
import Sketch from 'react-p5';
import * as p5 from 'p5'
import * as ml5 from "ml5";
// import "p5/lib/addons/p5.dom";
// import './styles.css';

class Sketchy extends React.Component {
	// y = 0;
	// direction = '^';
    // const canvas;
    // let video;
    preload = (p5) => {
        // this.classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3iU5gtESu/');
    }
	setup = (p5, parentRef) => {
		p5.createCanvas(640, 360).parent(parentRef);
        this.video = p5.createCapture(Twilio.Video);
        // const sketch  = new p5();
        // sketch.createCanvas(200, 200)
        this.video.hide();

        // this.video.size(200,200);
	};

	draw = (p5) => {
		p5.background(0);
		// p5.fill(255, this.y * 1.3, 0);
		// p5.ellipse(p5.width / 2, this.y, 50);
		// if (this.y > p5.height) this.direction = '';
		// if (this.y < 0) {
		// 	this.direction = '^';
		// }
		// if (this.direction === '^') this.y += 8;
		// else this.y -= 4;
        p5.tint(255,50,150);
        p5.image(this.video, 0, 0);
        
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