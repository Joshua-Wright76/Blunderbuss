function tendon(){
  this.shortLength = ~~random(20, 50);
  this.longLength = ~~random(100, 200);
  this.frequency = Math.random() <= 0.2 ? 0 : Math.random()*1.5;
  this.expansionAmount = this.longLength - this.shortLength;
  this.stiffness = random(0.01, 0.05);
  this.bodyA;
  this.bodyB;
}

function kronenberg(position){
  var nodes = [];
  var tendons = [];

  var nodesNumber = ~~random(7, 10);
  var tendonsNumber = ~~random(5, 4*nodesNumber);

  var spawnPos = position;

  for(let i = 0;i<nodesNumber;i++){
    Math.random(0,1)>0.5 ? nodes.push("HF") : nodes.push("LF");
  }

/*
  for(let i = 0;i<tendonsNumber;i++){
    tendons.push(new tendon());

    let newBlock =

    let firstNode = nodes[~~random(nodesNumber-1)];
    let secondNode = nodes[~~random(nodesNumber-1)];
    while(firstNode == secondNode){
      secondNode = nodes[~~random(nodesNumber-1)];
    }

    tendons[tendons.length - 1].bodyA;
    tendons[tendons.length - 1].bodyB;
  }
*/

  for(let i = 0; i<nodes.length;i++){
    let newBlock = new block([spawnPos[0]+i, spawnPos[1]+i], 30, 30, nodes[i] == "HF" ? "HIGH FRICTION" : "VANILLA")
    blocks.push(newBlock);
    nodes[i] = newBlock;
  }

  for(let i = 0;i<tendonsNumber;i++){
    tendons.push(new tendon());

    let firstNode = nodes[~~random(nodesNumber-1)];
    let secondNode = nodes[~~random(nodesNumber-1)];
    while(firstNode == secondNode){
      secondNode = nodes[~~random(nodesNumber-1)];
    }

    let options = {bodyA: firstNode.body, bodyB: secondNode.body, stiffness: tendons[i].stiffness, length:tendons[i].shortLength,
                  damping: 0}


    let thisRope = new rope(options, tendons[i].frequency, tendons[i].longLength, true);
    ropes.push(thisRope);

    firstNode.ropes.push(thisRope);
    secondNode.ropes.push(thisRope);

  }

  for(let i of nodes){
    if(i.ropes.length == 0){
      i.dead = true;
      console.log(i);
    }
  }




  return [nodes, ropes];


}
