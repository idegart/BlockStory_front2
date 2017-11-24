export default function draw(canvas, ctx, offset, data) {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  let inPositions = getInPositions(data.IN, offset),
      connections = getOutPositions(inPositions, data.OUT, offset);

  if (data.extra.stop.position.left !== 0 && data.extra.stop.position.top !== 0)
    connections.push({
      position: {
        from: data.extra.start.position,
        to: data.extra.stop.position
      },
      type: "10"
    });

  render(ctx,connections);
}

function render(ctx, connections) {
  for (let i = 0; i < connections.length; i++){

    if (connections[i] === undefined
      || connections[i].position.from === undefined
      ||connections[i].position.to === undefined)

      continue;

    let from = {
      x: connections[i].position.from.left,
      y: connections[i].position.from.top
    };

    let to = {
      x: connections[i].position.to.left,
      y: connections[i].position.to.top
    };

    switch (connections[i].type){
      case "1":
        ctx.strokeStyle = "#ffffff";
        break;
      case "2":
        ctx.strokeStyle = "#ffd200";
        break;
      case "3":
        ctx.strokeStyle = "#13CE66";
        break;
      case "10":
        ctx.strokeStyle = "#ce091b";
        break;
    }

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(from.x + 50, from.y,to.x - 50, to.y,to.x, to.y);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
}

function findBlockPosition(block,offset) {
  let bounding = block.getBoundingClientRect();

  return {
    top: bounding.top + offset.top + block.clientHeight/2,
    left: bounding.left + offset.left + block.clientWidth/2
  };
}

function getInPositions(IN, offset) {
  let blocks = [];

  for (let i=0; i < IN.length; i++){
    let block = IN[i].classList.value.match(/IN:(.*):(.*)/i);

    if (!block)
      continue;

    blocks.push({
      param_id: block[1],
      type: block[2],
      position: findBlockPosition(IN[i],offset)
    });
  }
  return blocks;
}

function findInPosition(inBlock, inArr) {
  for (let i=0; i < inArr.length; i++){
    if (inArr[i].param_id === inBlock)
      return inArr[i].position;
  }
}

function getOutPositions(inPositions,out,offset) {
  let connections = [];

  for (let i=0; i < out.length; i++){
    let block = out[i].classList.value.match(/OUT:(.*):(.*):(.*)/i);

    if (!block)
      continue;

    let data = {
      from: block[1],
      to: block[2],
      type: block[3],
      position: findBlockPosition(out[i],offset)
    };

    let connection = {
      position: {
        from: findBlockPosition(out[i],offset),
        to: findInPosition(data.to, inPositions)
      },
      type: data.type
    };


    connections.push(connection);
  }
  return connections;
}
