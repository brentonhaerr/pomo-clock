import * as act from '../constants/actions';
import * as status from '../constants/clock_status';

export const ClockReducer = (state, action) => {
  switch (action.type) {
    case act.START_CLOCK:
      return _start(state);
    case act.PAUSE_CLOCK:
      return _pause(state);
    case act.RESET_CLOCK:
      return _reset(state);
    case act.RESUME_CLOCK:
      return _resume(state);
    case act.SET_TIME_REMAINING:
      return _set_time_remaining(state, action);
    default:
      return state;
  }
}

function _start(state) {
  console.log("REDUCER: _start");
  return { ...state, clock_status: status.RUNNING, session_end: (Date.now() + state.session_length) }
}

function _pause(state) {
  console.log("REDUCER: _pause");
  return { ...state, clock_status: status.PAUSED, time_remaining: (state.session_end - Date.now()) }
}

function _resume(state) {
  console.log("REDUCER: _resume");
  return { ...state, clock_status: status.RUNNING, session_end: (Date.now() + state.time_remaining) }
}

function _reset(state) {
  console.log("REDUCER: _reset");
  return { ...state }
}

function _set_time_remaining(state, action) {
  return { ...state, time_remaining: action.value }
}