import limitWords from '../../../functions/limitWords';

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
    case 'text_block_input':
      setTextInputBlock(block);
      break;
    case 'random':
      randomBlock(block);
      break;
    case 'set_param':
      setParamBlock(block);
      break;
    case 'next_chapter':
      setNextChapterBlock(block);
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

    paramOut.title = answer.text ? limitWords(answer.text, 12) : 'Answer #' + (i + 1);
    paramOut.next_block = paramOut.connector = answer.next_block || null;

    paramOut.data = 'answer_' + i;

    block.params.out.push(paramOut);
  }

  let paramOut = emptyParamOut();
  paramOut.title = 'Timer';
  paramOut.next_block = paramOut.connector = block.extra.timer.next_block || null;
  paramOut.data = 'timer';
  paramOut.type = 2;

  block.params.out.push(paramOut);
}

function setTextInputBlock(block) {

  let paramIN = emptyParamIn();
  paramIN.param_id = block.hash;
  block.params.in.push(paramIN);

  let paramOut1 = emptyParamOut();

  paramOut1.title = 'OUT';
  paramOut1.next_block = paramOut1.connector = block.extra.answer.next_block || null;

  paramOut1.data = 'next_block';

  block.params.out.push(paramOut1);

  let paramOut2 = emptyParamOut();
  paramOut2.title = 'Timer';
  paramOut2.next_block = paramOut2.connector = block.extra.timer.next_block || null;
  paramOut2.data = 'timer';
  paramOut2.type = 2;

  block.params.out.push(paramOut2);
}

function randomBlock(block) {
  let paramIN = emptyParamIn();
  paramIN.param_id = block.hash;
  block.params.in.push(paramIN);

  for (let i=0; i < block.extra.random.length; i++){
    let random = block.extra.random[i];
    let paramOut = emptyParamOut();

    paramOut.title = ('Next #' + (i + 1));
    paramOut.next_block = paramOut.connector = random.next_block || null;

    paramOut.data = 'next_' + i;

    block.params.out.push(paramOut);
  }
}

function setParamBlock(block) {
  let paramIN = emptyParamIn();
  paramIN.param_id = block.hash;
  block.params.in.push(paramIN);

  let paramOut = emptyParamOut();

  paramOut.title = 'OUT';
  paramOut.next_block = paramOut.connector = block.extra.next_block || null;

  paramOut.data = 'next_block';

  block.params.out.push(paramOut);
}

function setNextChapterBlock(block) {
  let paramIN = emptyParamIn();
  paramIN.param_id = block.hash;
  block.params.in.push(paramIN);
}
