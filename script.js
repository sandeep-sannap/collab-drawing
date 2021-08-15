const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
context.fillStyle = "white";

context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let stack = [];
let index = -1;

function change_color(element) {
  //console.log(element.style.background.split(" ")[0]);
  draw_color = element.style.background.split(" ")[0];
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );

  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );

    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;

    context.lineCap = "round";
    context.lineJoin = "round";

    context.stroke();
  }
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }

  event.preventDefault();

  if (event.type !== "mouseout") {
    // console.log(context.getImageData(0, 0, canvas.width, canvas.height))
    stack.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index = 1;
    console.log(stack);
  }
}

function clear_canvas() {
  context.fillStyle = "white";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  stack = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas;
  } else {
    // index -= 1;
    stack.pop();
    context.putImageData(stack[index], 0, 0);
    index -= 1;
  }
}
