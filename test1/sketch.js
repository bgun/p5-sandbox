let webcam;

function setup() {
  createCanvas(800, 800);
  background(0);
  webcam = createCapture(VIDEO);
  webcam.hide();
}

function draw() {
  background(0);
  image(webcam, 0, 0, width, height, 0, 0, webcam.width, webcam.height, CONTAIN);
  filter(INVERT)
  /*
  noStroke();
  const c = color(50, random(255), random(255), 50)
  fill(c)
  circle(mouseX, mouseY,random(20,200))
  */
}


