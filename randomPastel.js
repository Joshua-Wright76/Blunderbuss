












function randomPastel(){
  var seed = ~~(random()*5);
  var color = [0, 0, 0];

  if(seed == 0){color = [255,179,186]}
  if(seed == 1){color = [255,186,255]}
  if(seed == 2){color = [255,255,186]}
  if(seed == 3){color = [186,255,201]}
  if(seed == 4){color = [186,225,255]}

  return color;
}
