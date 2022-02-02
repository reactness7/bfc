var canvas, ctx, walkers = [];
var colors = [
  "rgba(255, 0, 0, .1)",
  "rgba(255,127 ,0 , .1)",
  "rgba(255,255 ,0 , .1)",
  "rgba(0,255 ,0, .1)",
  "rgba(0,0,255 , .1)",
  "rgba(75,0,130,.1)",
  "rgba(143,0,255 , .1)"
];

var Walker = function(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

Walker.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
}

function rand(max) {
  return Math.floor((max) * Math.random());
}

function setup() {
  var x = Math.floor(window.innerWidth / 2);
  var y = Math.floor(window.innerHeight / 2);

  canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;

  for (var i = 0; i < 500; i++) {
    walkers.push(new Walker(x, y, colors[rand(7)]));
  }
}


function drawEach(walker) {
  var x = walker.x,
    y = walker.y;

  switch (rand(4)) {
    case 0:
      if (walker.x < canvas.width) x += 5;
      break;

    case 1:
      if (walker.x > 0) x -= 5;
      break;

    case 2:
      if (walker.y < canvas.height) y += 5;
      break;

    case 3:
      if (walker.y > 0) y -= 5;
      break;
  }

  ctx.strokeStyle = walker.color;

  ctx.beginPath();
  ctx.moveTo(walker.x, walker.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  walker.update(x, y);
}

function draw() {
  walkers.forEach(drawEach);
  requestAnimationFrame(draw);
}


window.onload = function(){
  setup();
  requestAnimationFrame(draw);
}
