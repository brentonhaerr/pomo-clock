import * as act from '../constants/actions';

export const ClockContext = (state, action) => {
  switch (action.type) {
    case act.START_CLOCK:
      return _start(state);
    case act.PAUSE_CLOCK:
      return _pause(state);
    case act.RESET_CLOCK:
      return _reset(state);
    default:
      return state;
  }
}

function _start(state) {
  return { ...state }
}

function _pause(state) {
  return { ...state }
}

function _reset(state) {
  return { ...state }
}