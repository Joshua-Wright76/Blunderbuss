function explode(epicenter, magnitude){ //List of x and y of explosion origin
  var distX;
  var distY;
  var dist;
  var distVector;
  var angle;
  var c = magnitude;
  var r;
  var qo = 0; //stands for quadrant offset

  for(var i = 0;i<blocks.length;i++){
      if(blocks[i].type != "BOUND"){

      distY = epicenter[1] - blocks[i].body.position.y;
      distX = epicenter[0] - blocks[i].body.position.x;

      if(distX > 0 && distY >= 0){qo = 180}
      if(distX >= 0 && distY < 0){qo = 270}
      if(distX <= 0 && distY < 0){qo = 0}
      if(distX <= 0 && distY >= 0){qo = 270}

      dist = Math.sqrt((distX**2) + (distY**2));



      r = -c / dist;

      dist == 0 ? r = 1 :

      distVector = Matter.Vector.normalise({x: distX, y: distY});

      distVector = Matter.Vector.mult(distVector, r);

      Matter.Body.applyForce(blocks[i].body, blocks[i].body.position, distVector);

      //if(dist < 100){blocks[i].body.timeScale = 0.5} uncomment for funky time business



    }
  }
}

function spin(){
  for(var i = 0;i<blocks.length;i++){
    Matter.Body.applyForce(blocks[i].body, {x: blocks[i].body.position.x/2, y: blocks[i].body.position.y/2}, {x: 0, y: -0.09});
  }
}












function quadrisect(epicenter, magnitude){ //List of x and y of explosion origin
  var distX;
  var distY;
  var dist;
  var angle;
  var c = magnitude;
  var r;

  for(var i = 0;i<blocks.length;i++){

    distY = epicenter[1] - blocks[i].body.position.y;
    distX = epicenter[0] - blocks[i].body.position.x;

    dist = Math.sqrt(distX^2 + distY^2);

    distVector = {x: distX, y: distY};

    Matter.Vector.angle(distVector, )

    rVector = {x: -c/(distX), y: -c/(distY)}

    Matter.Body.applyForce(blocks[i].body, blocks[i].body.position, rVector);
  }
}










//asdfas
