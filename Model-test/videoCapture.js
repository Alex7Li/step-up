<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>

// This goes in the <scrip> tag:
// Video
    let video

    function setup() {
        createCanvas(640, 520);
        //   create video
        video = createCapture(VIDEO);
        video.hide();
    }

    // STEP 2: CLASSIFY

    function draw() {
    image(video, 0,0);
    // background(0);
    }