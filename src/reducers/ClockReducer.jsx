import * as act from '../constants/actions';
import * as status from '../constants/clock_status';
import * as mode from '../constants/clock_modes';

export const ClockReducer = (state, action) => {
  switch (action.type) {
    case act.START_CLOCK:
      return _start_session(state);
    case act.PAUSE_CLOCK:
      return _pause(state);
    case act.RESET_CLOCK:
      return _reset(state);
    case act.RESUME_CLOCK:
      return _resume(state);
    case act.SET_TIME_REMAINING:
      return _set_time_remaining(state, action);
    case act.SWITCH_MODE:
      return _switch_mode(state);
    case act.ADJUST_TIMER:
      // action must have timer: and direction:
      return _adjust_timer(state, action);
    default:
      return state;
  }
}

function _start_session(state) {
  console.log("REDUCER: _start_session");
  // Reset default tick_rate
  return { ...state, clock_status: status.RUNNING, clock_mode: mode.SESSION, session_end: (Date.now() + state.session_length), time_remaining: state.session_length, tick_rate: 250 }
}

function _start_break(state) {
  console.log("REDUCER: _start_break");
  // Reset default tick_rate
  return { ...state, clock_status: status.RUNNING, clock_mode: mode.BREAK, time_remaining: state.break_length, session_end: (Date.now() + state.break_length), tick_rate: 250 }
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
  return { ...state, clock_status: status.STOPPED, clock_mode: mode.SESSION, session_length: (25*60*1000), break_length: (5*60*1000), tick_rate: 250, time_remaining: (25*60*1000) }
}

function _adjust_timer(state, action) {
  if (state.clock_status !== status.STOPPED) {
    console.log("Cannot adjust timers while clock is running.");
    return state;
  }
  let value_change = (action.direction === 'up' ? 1 : -1);
  let new_length;
  switch (action.timer) {
    case "session":
      new_length = state.session_length + (value_change*60*1000);
      if (new_length < 1) { new_length = (1*60*1000) };
      return { ...state, session_length: new_length };
    case "break":
      new_length = state.break_length + (value_change*60*1000);
      if (new_length < 1) { new_length = (1*60*1000) };
      return { ...state, break_length: new_length };
    default:
      console.log("Unexpected value in _adjust_timer");
      return state;
  }
}

function _switch_mode(state) {
  switch (state.clock_mode) {
    case mode.SESSION:
      return _start_break(state);
    case mode.BREAK:
      return _start_session(state);
    default:
      console.log("_switch_mode received unexpected input");
      return state;
  }
}

function _set_time_remaining(state, action) {

  // Limit the tick rate for the final tick to true up any drift.
  let tick = 250;
  if (action.value < state.tick_rate) {
    tick = action.value;
  }

  return { ...state, time_remaining: action.value, tick_rate: tick }
}