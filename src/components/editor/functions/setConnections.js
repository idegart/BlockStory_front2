export default function toConnect(connection) {

  let params  = {},
      from    = connection.start,
      to      = connection.stop || {};

  switch (from.block.type){
    case 'starter':
      params = connectStarter(from, to);
      break;
    case 'text_block_select':
      params = connectTextSelect(from, to);
      break;
    case 'text_block_input':
      params = connectTextInput(from, to);
      break;
    case 'random':
      params = connectRandom(from, to);
      break;
    case 'set_param':
      params = connectSetParam(from, to);
      break;
  }

  return params;
}

function connectStarter(from, to) {

  from.block.extra.next_block = to.hasOwnProperty('block') ? to.block.hash : null;
  from.block.params.out[0].connector = to.hasOwnProperty('param') ? to.param.param_id : null;

  return {
    next_block: to.hasOwnProperty('block') ? to.block.hash : null
  };

}

function connectTextSelect(from, to) {

  if (from.param.data === 'timer'){

    from.block.params.out[4].connector = to.hasOwnProperty('param') ? to.param.param_id : null;

    return{
      timer_next_block: to.hasOwnProperty('block') ? to.block.hash : null
    }
  }

  let answer = from.param.data.split('_'),
    answerNum = answer[1];

  from.block.params.out[answerNum].connector = to ? to.param ? to.param.param_id || null : null : null;

  return {
    answer_num: answerNum,
    next_block: to ? to.block ? to.block.hash || null : null : null
  };
}

function connectTextInput(from, to) {

  if (from.param.data === 'timer'){

    from.block.params.out[1].connector = to.hasOwnProperty('param') ? to.param.param_id : null;

    return{
      timer_next_block: to.hasOwnProperty('block') ? to.block.hash : null
    }
  }

  from.block.params.out[0].connector = to ? to.param ? to.param.param_id || null : null : null;

  return {
    next_block: to.hasOwnProperty('block') ? to.block.hash : null
  };
}

function connectRandom(from, to) {
  let random = from.param.data.split('_'),
      randomNum = random[1];

  from.block.params.out[randomNum].connector = to ? to.param ? to.param.param_id || null : null : null;

  return {
    random_num: randomNum,
    next_block: to ? to.block ? to.block.hash || null : null : null
  };
}
function connectSetParam(from, to) {

  from.block.params.out[0].connector = to.hasOwnProperty('block') ? to.block.hash : null

  return {
    next_block: to.hasOwnProperty('block') ? to.block.hash : null
  };
}
