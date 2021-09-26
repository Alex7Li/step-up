import { useEffect, useRef, useState } from 'react';
import { Pages } from '../constants.js';
import '../App.css';
import  Sketchy  from "../sketches/sketch.js";
import { Button } from '../Landing/Button'
import '../Landing/landing.css';

const posenet = require('@tensorflow-models/posenet');
const axios = require('axios').default;
const { connect } = require('twilio-video');


function Twilio(props) {
  const setCurPage = props.setCurPage
  const TWILIO_DOMAIN = "tfvideo-9931-dev.twil.io";
  const ROOM_NAME = 'tf';
  const Video = Twilio.Video;
  let videoRoom;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const minConfidence = 0.2;
  const VIDEO_WIDTH = 200;
  const VIDEO_HEIGHT = 200;
  const frameRate = 3;

  const processVideo = () => {
    // Preview screen
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(vid => {
        if (vid == null) {
          window.location.reload(false);
        }
        const video = videoRef.current;
        if (video == null) {
          window.location.reload(false);
        }
        video.srcObject = vid;
        // video.hide();
        // video.srcObject = Sketchy.video;  // from abu's stuff
        const intervalID = setInterval(async () => {
          try {
            // estimateMultiplePoses();
          } catch (err) {
            clearInterval(intervalID)
          }
        }, Math.round(1000 / frameRate))
        return () => clearInterval(intervalID)
      });
    }

  useEffect(() => {
    processVideo()
  })

  const estimateMultiplePoses = () => {
    const video = videoRef.current;
    console.log("ok...")
    console.log(video)
    posenet.load()
      .then(function (net) {
        return net.estimatePoses(video, {
          decodingMethod: "single-person",
        });
      })
      .then(function (poses) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = VIDEO_WIDTH;
        canvas.height = VIDEO_HEIGHT;
        ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        ctx.save();
        ctx.drawImage(video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        ctx.restore();
        poses.forEach(({ score, keypoints }) => {
          if (score >= minConfidence) {
            // drawKeypoints(keypoints);
            // drawSkeleton(keypoints);
          }
        });
      });
  };

  // buttons
  const joinRoomButton = document.getElementById("button-join");
  const leaveRoomButton = document.getElementById("button-leave");

  const joinRoom = () => {
    axios.get(`https://${TWILIO_DOMAIN}/video-token`).then(async (body) => {
      const token = body.data.token;
      console.log(token);

      connect(token, { name: ROOM_NAME }).then((room) => {
        console.log(`Connected to Room ${room.name}`);
        videoRoom = room;

        room.participants.forEach(participantConnected);
        room.on("participantConnected", participantConnected);

        room.on("participantDisconnected", participantDisconnected);
        room.once("disconnected", (error) =>
          room.participants.forEach(participantDisconnected)
        );
        // joinRoomButton.disabled = true;
        // leaveRoomButton.disabled = false;
      });
    });
  };
  const leaveRoom = () => {
    videoRoom.disconnect();
    console.log(`Disconnected from Room ${videoRoom.name}`);
    // joinRoomButton.disabled = false;
    // leaveRoomButton.disabled = true;
  };

const participantConnected = (participant) => {
  console.log(`Participant ${participant.identity} connected'`);

  const div = document.createElement('div');
  div.id = participant.sid;
  div.className = "participant-video";

  participant.on('trackSubscribed', track => trackSubscribed(div, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });
  document.getElementById("pvids").appendChild(div);
  // document.body.appendChild(div);
  //new div
}

const participantDisconnected = (participant) => {
  console.log(`Participant ${participant.identity} disconnected.`);
  document.getElementById(participant.sid).remove();
}

const trackSubscribed = (div, track) => {
  div.appendChild(track.attach());
}

const trackUnsubscribed = (track) => {
  track.detach().forEach(element => element.remove());
}
const goToLandingPage = () => {
  console.log("Pressed back button")
  setCurPage(Pages.LandingPage)
}
  return (
    <div>
      {/* <p>Twilio</p> */}
      <div id="room-controls">
        <canvas id="canvas" ref={canvasRef}></canvas>
        <video id="video-people" ref={videoRef} autoPlay muted={true} position="relative" width="1" height="1"/>

        <div class="fab-container">
          <div class="fab fab-icon-holder">
            <i class="fas fa-play"></i>
          </div>
          <ul class="fab-options">
            <li>
              <span class="fab-label" >Join Room</span>
              <div class="fab-icon-holder" onClick={joinRoom}>
                <i class="fas fa-music"></i>
              </div>
            </li>
            <li>
              <span class="fab-label">Disconnect</span>
              <div class="fab-icon-holder" onClick={leaveRoom}>
                <i class="fas fa-phone-slash"></i>
              </div>
            </li>
            <li  >
              <span class="fab-label">Go Back</span>
              <div class="fab-icon-holder" onClick={goToLandingPage}>
                <i class="fas fa-arrow-left"></i>
              </div>
            </li>
          </ul>
        </div>
        {/* <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            id="button-join"
            onClick={joinRoom}
          >
            Join Room <i className='far fa-play-circle' />
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            id="button-leave"
            onClick={leaveRoom}
          >
            Leave Room
          </Button>
        </div>  */}
        <div id='pvids'></div>
      </div>
    </div>
  );
}

export default Twilio;
