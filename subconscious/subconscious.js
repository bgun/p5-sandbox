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

function preload() {
  facemesh = ml5.facemesh(); // Load the ML5.js FaceMesh model
  frameImage = loadImage('assets/blur-circle.png');
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
}

// Callback function to handle face detection results
function gotFaces(results) {
  faces = results; // Store the detected faces in the faces array
  if(results && results[0]) {
    predictions = results[0].keypoints;
    facebox = results[0].box;
  }
}