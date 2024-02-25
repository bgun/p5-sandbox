let video; // Variable to store the video capture
let facemesh; // Variable to store the ML5.js FaceMesh model
let faces = []; // Array to store detected faces
let frameImage, textTop, textBottom;
let gif;
let ratioW, ratioH;
let predictions = [];
let facebox;
let faceshim = 10;

let showFlash = false;
let showWait  = false;
let showFinal = false;

let vibes = [];
let finalVibe;

function preload() {
  facemesh = ml5.facemesh(); // Load the ML5.js FaceMesh model
  frameImage = loadImage('assets/blur-circle.png');
  textTop    = loadImage('assets/text-astral.png');
  textBottom = loadImage('assets/text-vibecheck.png');
  textFlash  = loadImage('assets/text-checkingvibes.png');
  textWait   = loadImage('assets/text-yourvibe.png');

  // various vibes
  vibeChill  = loadImage('assets/text-vibe-chill.png');
  vibeCozy   = loadImage('assets/text-vibe-cozy.png');
  vibeCursed = loadImage('assets/text-vibe-cursed.png');
  vibeMysterious = loadImage('assets/text-vibe-mysterious.png');
  vibeLowkey = loadImage('assets/text-vibe-lowkey.png');

  vibes = [vibeChill, vibeCozy, vibeCursed, vibeMysterious, vibeLowkey];
}

// Setup function runs once at the beginning
function setup() {
  // Create a canvas the size of the window
  createCanvas(windowWidth, windowHeight);
  console.log("Window", width, height);
  // Create a video capture object
  video = createCapture(VIDEO);
  //video.size(windowWidth, windowHeight);
  console.log("Video", video.width, video.height);
  // Set the size of the video capture to match the canvas size
  // Hide the video element
  video.hide();
  //gif.position(50, 50);
  facemesh.detectStart(video, gotFaces); // Start face detection on the video feed
  textSize(100);

  setTimeout(() => { showFlash = true;  }, 3000);
  setTimeout(() => { showFlash = false; }, 3500);
  setTimeout(() => { showFlash = true;  }, 4000);
  setTimeout(() => { showFlash = false; }, 4500);
  setTimeout(() => { showFlash = true;  }, 5000);
  setTimeout(() => { showFlash = false; }, 5500);
  setTimeout(() => { showFlash = true;  }, 6000);
  setTimeout(() => { showFlash = false; }, 6500);

  setTimeout(() => { showWait  = true; }, 7000);
  setTimeout(() => { showWait  = false; }, 8500);

  setTimeout(() => {
    finalVibe = catchAVibe();
    showFinal = true;
  }, 9000);
}

function catchAVibe() {
  let numVibes = vibes.length;
  let v = Math.floor(Math.random() * numVibes) + 1;
  return vibes[v];
}

function draw() {
  // Mirror the display
  translate(width,0);
  scale(-1,1);

  image(video, 0, 0, windowWidth, windowHeight);

  ratioW = windowWidth / video.width;
  ratioH = windowHeight / video.height;
  
  /*
  // Show all keypoints as dots
  if(predictions) {
    for (let i = 0; i < predictions.length; i += 1) {
      if(predictions[i]) {
        let x = predictions[i].x * ratioW;
        let y = predictions[i].y * ratioH;
        fill(255, 255, 255);
        ellipse(x, y, 5, 5);
      }
    }
  }
  */

  // use ml5 to pick out only the face and expand to fill the window
  if(facebox) {
    image(video, 0, 0, windowWidth, windowHeight, facebox.xMin-(faceshim), facebox.yMin-(faceshim), facebox.width+(faceshim*2), facebox.height+(faceshim*2));
  }

  // playing with filters
  filter(INVERT);
  filter(BLUR, 20);
  filter(POSTERIZE, 6);

  // add frame and words
  image(frameImage,0,0,windowWidth, windowHeight);
  image(textTop,   0,0,windowWidth, 300);
  image(textBottom,0,windowHeight-300,windowWidth, 300);

  if (showFlash) {
    image(textFlash,0,(windowHeight/2)-150,windowWidth, 300);
  }
  if (showWait) {
    image(textWait,0,(windowHeight/2)-150,windowWidth, 300);
  }

  if (showFinal) {
    image(finalVibe,0,(windowHeight/2)-150,windowWidth, 300);
  }
}

// Callback function to handle face detection results
function gotFaces(results) {
  faces = results; // Store the detected faces in the faces array
  if(results && results[0]) {
    predictions = results[0].keypoints;
    facebox = results[0].box;
  }
}