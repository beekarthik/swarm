const swarm = [];

function setup(){
  createCanvas(640, 360);

  for(let i=0; i<100; i++){
    swarm.push(new Boid());
  }
}

function draw() {
  background(51);
  for (let boid of swarm) {
    boid.wrapAround();
    boid.swarmDynamics(swarm);
    boid.update();
    boid.show();
  }
}
