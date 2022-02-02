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

const spyEls = document.querySelectorAll('.scroll-spy')
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

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
