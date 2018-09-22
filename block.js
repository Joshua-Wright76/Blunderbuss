


function block(pos, width, height, type, typeArgs) {
  this.body = Bodies.rectangle(pos[0], pos[1], width, height);

  this.type = type;

  this.width = width;
  this.oWidth = width;
  this.height = height;

  this.selected = false;

  this.color = randomPastel();

  World.add(world, this.body);

  this.dead = false;
  this.trailing = false;
  this.trail = [];

  //this.body.restitution = 0.8;

  this.body.frictionAir = 0.01;

  this.ropes = [];

  if(this.type == "BOUND"){
    Matter.Body.setStatic(this.body, true);
  }

  if(this.type == "HIGH FRICTION"){
    this.body.friction = 2;
    this.color = [0, 0, 0];


  }

  if(this.type == "COMPASS"){
    this.strength = typeArgs[0];
  }

  if(this.type == "MOTOR"){
    this.strength = typeArgs[0];
  }

  if(this.type == 'PISTON'){
    this.pTimer = typeArgs[1];
    this.exAmount = typeArgs[0] / typeArgs[2] //Extension Length divided by actuation length
    this.aTimer = typeArgs[2];
    this.pTime = typeArgs[1];
    this.aTime = typeArgs[2];
  }

  if(this.type == "BOMB"){
    this.timer = typeArgs[0];
    this.magnitude = typeArgs[1];
    this.tickRate = this.timer / 255;
    this.color = [0, 0, 0];
    Matter.Body.setDensity(this.body, 0.00001);
  }

  this.extend = function(pixels){
    var scaleConstant = (pixels / this.width) + 1;
    this.body.angle = 0;
    Matter.Body.scale(this.body, scaleConstant, 1);
    this.body.angle = this.angle;
    this.width += pixels;
  }

  this.trace = function(){
    //draw this.body.velocity as a line in p5
    push()

    strokeWeight(3);
    stroke([0,0,0]);

    line(this.body.position.x, this.body.position.y,
         this.body.position.x + 5*this.body.velocity.x,
         this.body.position.y + 5*this.body.velocity.y
    )


    /*
    line(this.body.position.x, this.body.position.y,
         this.body.position.x + 5*this.body.force.x,
         this.body.position.y + 5*this.body.force.y
    )
    */
    /*
    line(this.body.position.x, this.body.position.y,
         this.body.position.x - 5*this.body.velocity.x,
         this.body.position.y - 5*this.body.velocity.y
    )
    */

    pop()
  }

  this.setToOWidth = function(){
    var oConstant = this.oWidth / this.width;
    Matter.Body.rotate(this.body, -this.angle);
    Matter.Body.scale(this.body, oConstant, 1);
    this.width = this.width*oConstant;
  }

  this.be = function(){
    var y = this.body.position.y;
    var x = this.body.position.x;
    var angle = this.body.angle;

    if(this.type != "BOUND"){
      if(x<0 || x>screenWidth){this.dead = true}
      if(y<0 || y>screenHeight){this.dead = true}
    }

    this.body.restitution = restitutionSlider.value()/10;


    if(this.ropes > 0){
      this.body.angle = this.ropes[0].angle();
    }


    if(this.type == "PISTON"){
      if(this.pTimer > 0){
        this.pTimer -= 1;
        if(this.pTimer - this.aTimer < 0){
          this.extend(this.exAmount);
        }
      } else {
        this.pTimer = this.pTime;
        this.aTimer = this.aTime;
        this.setToOWidth();
      }
    }



    if(this.type == "COMPASS"){

      this.angleVector = {x: Math.cos(angle + Math.PI/2)/1000, y: Math.sin(angle)/1000}
      var offsetPos = {x: this.body.position.x/2, y: this.body.position.y/2}
      Matter.Body.applyForce(this.body, offsetPos, this.angleVector);

    }

    if(this.type == "MOTOR"){

      this.angleVector = {x: Math.cos(angle + Math.PI/2)/2000, y: Math.sin(angle)/2000}
      var offsetPos = {x: Math.cos(gravityCounter)*this.body.position.x, y: this.body.position.y/2}
      Matter.Body.applyForce(this.body, offsetPos, this.angleVector);

    }


    if(this.type == "BOMB"){
      if(this.timer > 0){
        this.timer -= 1;
        this.color[0] += 20*this.tickRate;

      } else if (this.timer == 0) {
        this.timer = -1;
        this.dead = true;
        explode([this.body.position.x, this.body.position.y], this.magnitude);
      }
    }

    if(this.trailing){
      this.trail.push(this.body.position);
      for(let i of this.trail){
        point(i.x, i.y);
        console.log(this.trail);
      }
    }

    if(disco){
      this.color = [Math.sin(gravityCounter)*255, (x+gravityCounter*120)%255, 150];

      //if(Math.sin(gravityCounter)==1){explode([random(0, screenWidth), random(screenHeight*3/4, screenHeight)], 15)
      //dconsole.log("EXPLODED!")}

      if(this.type!="BOUND"){this.body.angle = 3*Math.sin(gravityCounter)}


    }





    //if( ~~(random() * 50) == 0){this.color = randomPastel()} uncomment for blinky lights

    push();

    strokeWeight(3);
    rectMode(CENTER);
    translate(x, y);
    rotate(angle);
    fill(this.color);
    rect(0, 0, this.width, this.height);
    noFill();
    if(this.selected){
      rect(0, 0, this.width+12, this.height+12);
      text("I'm selected!", 10, 20)
    }

    pop();
  }


}
