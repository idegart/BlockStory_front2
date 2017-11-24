export {setBlock}

function setBlock(block) {

  block.params = {
    in: [],
    out: []
  };

  switch (block.type){
    case 'starter':
      setStarterBlock(block);
      break;
    case 'text_block_select':
      setTextSelectBlock(block);
      break;
  }

}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function emptyParamIn() {
  return {
    param_id: uuidv4(),
    type: 1,
    title: 'IN',
  }
}
function emptyParamOut() {
  return {
    param_id: uuidv4(),
    type: 1,
    title: 'OUT',
    data: null,
    connector: null
  }
}

function emptyNextBlock() {
  return {
    block_hash: null,
    param_id: null,
    type: 1
  }
}

function setStarterBlock(block) {
  let paramOut = emptyParamOut();
  paramOut.data = 'next_block';
  paramOut.connector = block.extra.next_block || null;

  block.params.out.push(paramOut);
}

function setTextSelectBlock(block) {

  let paramIN = emptyParamIn();
  paramIN.param_id = block.hash;
  block.params.in.push(paramIN);

  for (let i=0; i < block.extra.answers.length; i++){
    let answer = block.extra.answers[i];
    let paramOut = emptyParamOut();

    paramOut.title = answer.text || ('Ответ #' + (i + 1));
    paramOut.next_block = paramOut.connector = answer.next_block || null;

    paramOut.data = 'answer_' + i;

    block.params.out.push(paramOut);
  }
}
