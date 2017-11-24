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
    return;
  }

  let answer = from.param.data.split('_'),
    answerNum = answer[1];

  from.block.params.out[answerNum].connector = to ? to.param ? to.param.param_id || null : null : null;

  return {
    answer_num: answerNum,
    next_block: to ? to.block ? to.block.hash || null : null : null
  };
}
