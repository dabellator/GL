const defaultState = {};

export default function (state = defaultState, action) {
  let newState;

  switch (action.type) {
    case 'SET_CURRENT_USER':
      newState = { current: action.uid };
      break;
    case 'AUTH_FAILED':
      newState = { error: action.message };
      break;
    case 'AUTH_LOGOUT':
      newState = {};
      break;
    default:
      newState = Object.assign({}, state);
  }

  return newState;
}
