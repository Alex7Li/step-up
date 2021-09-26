import { useEffect, useRef } from 'react';
import  Sketchy  from "../sketches/sketch.js";

const posenet = require('@tensorflow-models/posenet');
const axios = require('axios').default;
const { connect } = require('twilio-video');


function Twilio(props) {
  const TWILIO_DOMAIN = "tfvideo-9931-dev.twil.io";
  const ROOM_NAME = 'tf';
  const Video = Twilio.Video;
  let videoRoom;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const minConfidence = 0.2;
  const VIDEO_WIDTH = 320;
  const VIDEO_HEIGHT = 240;
  const frameRate = 3;

  const processVideo = () => {
    // Preview screen
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(vid => {
        const video = videoRef.current;
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

  useEffect(() =>{
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
  const site = `https://${TWILIO_DOMAIN}/video-token`;

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
        joinRoomButton.disabled = true;
        leaveRoomButton.disabled = false;
      });
    });
  };
  const leaveRoom = () => {
    videoRoom.disconnect();
    console.log(`Disconnected from Room ${videoRoom.name}`);
    joinRoomButton.disabled = false;
    leaveRoomButton.disabled = true;
  };

const participantConnected = (participant) => {
  console.log(`Participant ${participant.identity} connected'`);

  const div = document.createElement('div');
  div.id = participant.sid;

  participant.on('trackSubscribed', track => trackSubscribed(div, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });
  document.body.appendChild(div);
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
  return (
    <div>
      <p>Twilio</p>
      <div id="room-controls">
        <canvas id="canvas" ref={canvasRef}></canvas>
        <video id="video" ref={videoRef} autoPlay muted={true} position="relative" width="320" height="240"/>
        {/* onLoadedData={processVideo}></video>*/}
        <button id="button-join" onClick={joinRoom}>Join Room</button>
        <button id="button-leave" disabled onClick={leaveRoom}>Leave Room</button>
      </div>
    </div>
  );
}

export default Twilio;
