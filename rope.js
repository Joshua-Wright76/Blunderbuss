



function rope(options, frequency, longLength, isTendon) {
  this.frequency = frequency;
  this.pullConstant = 0;
  this.constraint = Matter.Constraint.create(options);
  this.originalLength = this.constraint.length;
  this.isTendon = isTendon;

  this.longLength = longLength;

  ropes.push(this);
  World.add(world, this.constraint);

  this.pos1;
  this.pos2;
  this.angle = 0;


  this.pull = function(){
    this.pullConstant += this.frequency/10;
    this.constraint.length = this.originalLength*Math.sin(this.pullConstant) + 2*this.originalLength;

  }

  this.be = function(){
    this.pos1 = this.constraint.bodyA.position;
    this.pos2 = this.constraint.bodyB.position;

    if(this.isTendon){this.pull()}
    console.log(this);

    push();

    strokeWeight(1);

    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

    pop();

  }

}

function clump(){
  for(var i = 0; i < blocks.length; i++){
    let otherBlock = blocks[~~random(0, blocks.length-1)]
    if(blocks[i].type != "BOUND" && otherBlock.type != "BOUND" && random(0,1)>0.5){
      ropes.push(new rope({bodyA: blocks[i].body, bodyB: otherBlock.body, stiffness: 0.05, length: 50}));
    }
  }
}
