const defaultState = {};

export default function (state = defaultState, action) {
  let newState;

  switch (action.type) {
    case 'GET_COUNT':
      newState = Object.assign({}, state, { [action.item]: action.value });
      break;
    default:
      newState = Object.assign({}, state);
  }

  return newState;
}
