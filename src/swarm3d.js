class Boid3D{
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2,4))
    this.maxForce = 2;
    this.maxSpeed = 4;
    this.acceleration = createVector();


  }

  get_x(){
    return this.position.x + (Math.cos(2*3.14*135/360)* this.position.z);
  }

  get_y(){
    return this.position.y + (Math.sin(2*3.14*135/360)* this.position.z);
  }

  wrapAround(){
      if (this.position.x > width) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = width;
      }
      if (this.position.y > height) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = height;
      }
    }
  alignment(swarm){
     let searchRadius = 50;
     let numLocalBoids = 0;
     let steeringForce = createVector();
     for (let boid of swarm){
       if(boid != this && (this.position.dist(boid.position) < searchRadius)) {
         steeringForce.add(boid.velocity);
         numLocalBoids++;
       }
     }
     if (numLocalBoids > 0){
       steeringForce.div(numLocalBoids);
       steeringForce.setMag(this.maxSpeed);
       steeringForce.sub(this.velocity);
       steeringForce.limit(this.maxForce);
     }

     return steeringForce;
   }
  separation(swarm){
    let searchRadius = 50;
    let steeringForce = createVector();
    let numLocalBoids = 0;
    for (let boid of swarm) {
      if (boid != this && (this.position.dist(boid.position) < searchRadius)) {
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.div(pow(this.position.dist(boid.position), 2));
        steeringForce.add(diff);
        numLocalBoids++;
      }
    }
    if (numLocalBoids > 0) {
      steeringForce.div(numLocalBoids);
      steeringForce.setMag(this.maxSpeed);
      steeringForce.sub(this.velocity);
      steeringForce.limit(this.maxForce);
    }
    return steeringForce;
  }
  cohesion(swarm){
    let searchRadius = 50;
    let numLocalBoids = 0;
    let steeringForce = createVector();
    for (let boid of swarm){
      if(boid != this && (this.position.dist(boid.position) < searchRadius)) {
        steeringForce.add(boid.position);
        numLocalBoids++;
      }
    }
    if (numLocalBoids > 0){
      steeringForce.div(numLocalBoids);
      steeringForce.sub(this.position);
      steeringForce.setMag(this.maxSpeed);
      steeringForce.sub(this.velocity);
      steeringForce.limit(this.maxForce);
    }
    return steeringForce;
  }

  swarmDynamics(swarm) {
    let alignmentForce = this.alignment(swarm);
    let cohesionForce = this.cohesion(swarm);
    let seperationForce = this.separation(swarm);
    this.acceleration.add(alignmentForce.mult(random(0.9, 1.2)));
    this.acceleration.add(cohesionForce.mult(random(0.9, 1.2)));
    this.acceleration.add(seperationForce.mult(random(1.0, 1.3)));
    }

  update() {
     this.position.add(this.velocity);
     this.velocity.add(this.acceleration);
     this.velocity.limit(this.maxSpeed);
     this.acceleration.mult(0);
    }

  show() {
      strokeWeight(10);
      stroke(255);
      point(this.position.x, this.position.y);
    }

}
