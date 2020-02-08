'use strict'
console.clear();
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor2');

let smallSpeed = 0.2;
let largeSpeed = 0.12;

let data = {
  x: 0.,
  y: 0.,
  largeX: 0,
  largeY: 0,
  targetX: 0,
  targetY: 0,
}


document.addEventListener('mousemove', e => {
  data.targetX = e.pageX;
  data.targetY = e.pageY;
});

const applyStyles = ()=>{
  cursor.style.transform = 
    `translate(${data.x - 5}px, ${data.y - 5}px) `
  cursorFollower.style.transform = 
    `translate(${data.largeX - 25}px, ${data.largeY - 25}px)`
}

const tick = ()=>{
  // Get distance to Target => targetX - x
  // Get 10% of that distance => ^^^ * smallSpeed
  // Add it to the circle => data.x += ^^^ 
  data.x += (data.targetX - data.x) * smallSpeed;
  // Repeat your Y-coord
  data.y += (data.targetY - data.y) * smallSpeed;
  
  data.largeX += (data.targetX - data.largeX) * largeSpeed;
  data.largeY += (data.targetY - data.largeY) * largeSpeed;
  
  applyStyles()
  requestAnimationFrame(tick);
}
tick();