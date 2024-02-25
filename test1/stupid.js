let video; // Variable to store the video capture
let facemesh; // Variable to store the ML5.js FaceMesh model
let faces = []; // Array to store detected faces
let frameImage;
let gif;
let ratioW, ratioH;
let predictions = [];
let facebox;

function preload() {
  facemesh = ml5.facemesh(); // Load the ML5.js FaceMesh model
  frameImage = loadImage('frame.png');
  //gif = createImg("squidanim.gif");
}

// Setup function runs once at the beginning
function setup() {
  // Create a canvas of size 640x480 pixels
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
   
  var to_speak = new SpeechSynthesisUtterance('Hello world!');
  //window.speechSynthesis.speak(to_speak);
}

// Draw function runs repeatedly, around 60 times per second by default
function draw() {
  // Display the video feed on the canvas
  //image(video, 0, 0, windowWidth, windowHeight, CONTAIN);
  //image(frameImage,0,0);

  // Mirror the display
  translate(width,0);
  scale(-1,1);

  image(video, 0, 0, windowWidth, windowHeight);

  ratioW = windowWidth / video.width;
  ratioH = windowHeight / video.height;
  
  /*
  for (let face of faces) {
    image(video, face.rightEye[0].x-50, face.rightEye[0].y-50, 100, 100);
    image(video, face.leftEye[0].x-50, face.leftEye[0].y-50, 100, 100);
    //text("😎", face.rightEye[0].x * ratioW, face.rightEye[0].y * ratioH);
    //text("😎", face.leftEye[0].x * ratioW,  face.leftEye[0].y * ratioH);
  }
  */

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

  if(facebox) {
    console.log("facebox", facebox.width, facebox.height);
    image(video, 0, 0, windowWidth, windowHeight, facebox.xMin-20, facebox.yMin-20, facebox.width+40, facebox.height+40);
  }

  filter(INVERT);
  /*
  filter(BLUR, 10);
  filter(POSTERIZE, 6);
  */
}

// Callback function to handle face detection results
function gotFaces(results) {
  faces = results; // Store the detected faces in the faces array
  if(results && results[0]) {
    predictions = results[0].keypoints;
    facebox = results[0].box;
  }
}