/*
  ML5.js Workshop Example
  Code by: Jack B. Du
  Date: Feb 24, 2024
  Description: This code captures video and detects faces using ML5.js FaceMesh model, drawing circles at the detected eye positions.
  Comments added by: ChatGPT 3.5
*/

let video; // Variable to store the video capture
let facemesh; // Variable to store the ML5.js FaceMesh model
let faces = []; // Array to store detected faces
let frameImage;

function preload() {
  facemesh = ml5.facemesh(); // Load the ML5.js FaceMesh model
  frameImage = loadImage('frame.png');
}

// Setup function runs once at the beginning
function setup() {
  // Create a canvas of size 640x480 pixels
  createCanvas(windowWidth, windowHeight);
  // Create a video capture object
  video = createCapture(VIDEO);
  // Set the size of the video capture to match the canvas size
  video.size(windowWidth, windowHeight);
  // Hide the video element
  video.hide();
  facemesh.detectStart(video, gotFaces); // Start face detection on the video feed
  textSize(50)
}

// Draw function runs repeatedly, around 60 times per second by default
function draw() {
  // Set background color to light gray (RGB: 220, 220, 220)
  background(220);
  // Display the video feed on the canvas
  image(video, 0, 0, windowWidth, windowHeight);
  filter(INVERT);
  image(frameImage,0,0);
  
  for (let face of faces) {
    //image(video, face.rightEye[0].x-50, face.rightEye[0].y-50, 100, 100);
    //image(video, face.leftEye[0].x-50, face.leftEye[0].y-50, 100, 100);
    text("😎", face.rightEye[0].x, face.rightEye[0].y);
    text("😎", face.leftEye[0].x, face.leftEye[0].y);
  }
}

// Callback function to handle face detection results
function gotFaces(results) {
  faces = results; // Store the detected faces in the faces array
}