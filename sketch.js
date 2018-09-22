

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
    Body = Matter.Body;

var screenWidth = 1500; //1500

var screenHeight = 835; //835

var engine = Engine.create();

var world = engine.world;

var gravityCounter = 0;

var blocks = [];
var ropes = [];

var mode = "VANILLA";
var tracing = false;
var disco = false;

function mouseDragged() {

  rand = random(25, 28)

  if(mode == "STANDING BOYS"){
    blocks.push(new block([mouseX, mouseY], 10, 200, "COMPASS", [1] ))
  }


  if(mode == "VANILLA"){
  if(disco){blocks.push(new block([mouseX, mouseY], rand, rand, "VANILLA"));}
  else(blocks.push(new block([mouseX, mouseY], rand, rand, "VANILLA")))
  }
  //blocks.push(new block([mouseX, mouseY], 30, 30, "HIGH FRICTION"));
}

function mousePressed(){
  //blocks.push(new block([mouseX, mouseY], 30, 30, "BOMB", [50, 5]));
  //explode([mouseX, mouseY], 5);
  //spin();
  //clump();



    if(mode == "KRONENBERG"){
      kronenberg([mouseX, mouseY]);
    }



    if(mode == "EXPLOSION"){
      explode([mouseX, mouseY], 10);
    }

    if(mode=="SPIN"){
      spin();
    }

    if(mode=="CLUMP"){
      clump();
    }

    if(mode == "BOMB"){
      blocks.push(new block([mouseX, mouseY], 30, 30, "BOMB", [50, 50]));
    }

  }

function setup() {
  var canvas = createCanvas(screenWidth, screenHeight);

  var mouse = Mouse.create(canvas.elt);

  mouse.pixelRatio = pixelDensity();

  var cursor = MouseConstraint.create(engine, {
    mouse: mouse,
  })

  restitutionSlider = createSlider(0, 13, 5);
  restitutionSlider.position(screenWidth+10, 10);node



  kronenbergButton = createButton("KRONENBERG");
  kronenbergButton.position(screenWidth+20, 50);

  kronenbergButton.mousePressed(function(){
    mode = "KRONENBERG";
  })

  bombButton = createButton("BOMB");
  bombButton.position(screenWidth+20, 100);

  bombButton.mousePressed(function(){
    mode = "BOMB";
  })

  vanillaButton = createButton("VANILLA");
  vanillaButton.position(screenWidth+20, 150);

  vanillaButton.mousePressed(function(){
    mode = "VANILLA";
  })

  explosionButton = createButton("EXPLOSION");
  explosionButton.position(screenWidth+20, 200);

  explosionButton.mousePressed(function(){
    mode = "EXPLOSION";
  })

  bounceTimeButton = createButton("STANDING BOYS")
  bounceTimeButton.position(screenWidth+20, 250);

  bounceTimeButton.mousePressed(function(){
    mode = "STANDING BOYS";
  })

  traceButton = createButton("TRACE")
  traceButton.position(screenWidth+20, 300);

  traceButton.mousePressed(function(){
    tracing = !tracing;
  })

  spinButton = createButton("SPIN")
  spinButton.position(screenWidth+20, 350);

  spinButton.mousePressed(function(){spin()});

  clumpButton = createButton("CLUMP")
  clumpButton.position(screenWidth+20, 400);

  clumpButton.mousePressed(function(){
    mode = "CLUMP";
  })

  discoButton = createButton("DISCO MODE")
  discoButton.position(screenWidth+20, 450);

  discoButton.mousePressed(function(){
    disco = !disco;
  })










  World.add(world, cursor);

  Engine.run(engine);

  blocks.push(new block([200, 100], 40, 40, "VANILLA"));

  //blocks.push(new block([100, 100], 40, 40, "VANILLA"));

  //ropes.push(new rope({bodyA: blocks[0].body, bodyB: blocks[1].body, stiffness: 0.3, length: 200}));

  var borderWidth = 500;

  blocks.push(new block([screenWidth/2, screenHeight+borderWidth/2], screenWidth, borderWidth, "BOUND"));
  blocks.push(new block([screenWidth+borderWidth/2, screenHeight/2], borderWidth, screenHeight, "BOUND"));
  blocks.push(new block([-borderWidth/2, screenHeight/2], borderWidth, screenHeight, "BOUND"));
  blocks.push(new block([screenWidth/2, -borderWidth/2], screenWidth, borderWidth, "BOUND"));
}

function draw() {
  background(255);

  //world.gravity.y = Math.sin(gravityCounter);

  //world.gravity.x = Math.cos(gravityCounter);

  //world.gravity.y = 0;

  //for(var rope of ropes){rope.constraint.length = (Math.abs(Math.cos(gravityCounter)*300)) + 100;}

  if(cursor.body != undefined){
    stroke(0,0,0);
    strokeWeight(3);
    line(mouseX, mouseY, cursor.body.position.x, cursor.body.position.y);
  }


  gravityCounter += 0.05;

  for(var i = 0; i< blocks.length; i++){
    if(!blocks[i].dead){
      blocks[i].be();
      if(tracing){blocks[i].trace()}
      //blocks[i].trace();
    } else {
      Matter.Composite.remove(world, blocks[i].body);
      blocks.splice(i, 1);
      i--;
    }
  }

  for(var i of ropes){
    i.be();
  }


}
