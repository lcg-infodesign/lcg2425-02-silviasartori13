let baseSize;
let cols, rows;
let padding;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  stroke(0);
  noFill();
  background(255);

  setupGrid();
  drawGrid();
}

function setupGrid() {
  cols = int(windowWidth / 100);
  rows = int(windowHeight / 100);
  
  baseSize = min(windowWidth, windowHeight) / (cols + 2);
  padding = baseSize * 0.5;
}

function drawGrid() {
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * (baseSize + padding) + padding;
      let y = j * (baseSize + padding) + padding;
      createFlowerGlyph(x, y, baseSize);
      
      // Aggiunge delle api attorno al fiore
      addBeesAround(x, y, baseSize);
    }
  }
}

function createFlowerGlyph(x, y, size) {
  let petalCount = int(random(10, 20));
  let petalSize = size * 0.4;
  let angleStep = TWO_PI / petalCount;

  for (let i = 0; i < petalCount; i++) {
    if (random() < 0.9) {
      let angle = i * angleStep;
      let petalX = x + cos(angle) * size * 0.4;
      let petalY = y + sin(angle) * size * 0.4;

      push();
      translate(petalX, petalY);
      rotate(angle);
      ellipse(0, 0, petalSize, petalSize * 0.6);
      pop();
    }
  }

  ellipse(x, y, size * 0.25);

  let dotCount = int(random(5, 8));
  for (let i = 0; i < dotCount; i++) {
    let dotX = x + random(-size * 0.3, size * 0.3);
    let dotY = y + random(-size * 0.3, size * 0.3);
    ellipse(dotX, dotY, size * 0.05);
  }
}

function addBeesAround(x, y, size) {
  let beeCount = int(random(2, 5));  // Numero casuale di api attorno a ciascun fiore
  
  for (let i = 0; i < beeCount; i++) {
    let angle = random(TWO_PI);
    let distance = random(size * 0.6, size * 1.2);
    let beeX = x + cos(angle) * distance;
    let beeY = y + sin(angle) * distance;

    drawBee(beeX, beeY, size * 0.15);  // Disegna una piccola ape
  }
}

function drawBee(x, y, beeSize) {
  push();
  translate(x, y);
  
  // Corpo dell'ape
  ellipse(0, 0, beeSize * 0.6, beeSize);  // Corpo ovale
  
  // Ali dell'ape
  ellipse(-beeSize * 0.35, -beeSize * 0.4, beeSize * 0.3, beeSize * 0.2);
  ellipse(beeSize * 0.35, -beeSize * 0.4, beeSize * 0.3, beeSize * 0.2);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupGrid();
  drawGrid();
}

