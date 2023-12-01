// okidoke:


// Array to hold video objects
let videos = [];
let playing = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupuBitSerial();

  // Initialize videos and set their attributes
  for (let i = 0; i < 2; i++) { // Increase the number as needed
    videos[i] = createVideo([`vids/vid${i + 1}.mp4`]);
    videos[i].hide();
    playing[i] = false;
  }
  document.querySelector("video").setAttribute("playsinline", ""); // for iOS
}

function draw() {
  for (let i = 0; i < videos.length; i++) {
    if (playing[i]) {
      image(videos[i], 0, 0, width, height);
    }
  }

  noFill();
  stroke("black");
  strokeWeight(2);
  textSize(width / 30);
  textAlign(CENTER, CENTER);

  if (playing.every(val => val === false)) {
    text("CLICK 2 PLEASE THE BROWSER GODS", width / 2, height / 2);
  } else {
    textAlign(LEFT, LEFT);
    text("frame = " + videos[0].time(), 10, height / 2);
  }
}

function touchStarted() {
  switchVid(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  console.log("ping");
  switch (key) {
    case 'x':
      switchVid(0);
      break;
    case 'a':
      switchVid(1);
      break;
    default:
      break;
  }
}

// this is the funtion that gets called by serial messages coming from mr.microbit
function onReceivedValue(name, value){
  console.log(name);
  console.log(value); 
  if(name == "vid"){
    switchVid(value);
  }
}

function switchVid(vidNum) {
  for (let i = 0; i < videos.length; i++) {
    if (i === vidNum) {
      console.log(`vidnum ${vidNum}`);
      videos[i].loop();
      playing[i] = true;
    } else {
      videos[i].stop();
      playing[i] = false;
    }
  }
}

// Additional logic for switching back to a background video can be added here.
