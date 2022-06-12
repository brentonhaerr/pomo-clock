import React, { useContext, useEffect } from 'react';
import { ClockContext } from '../contexts/ClockContext';
import * as status from '../constants/clock_status';
import * as act from '../constants/actions';
import * as mode from '../constants/clock_modes';

const Display = () => {
  const { session_end, clock_status, time_remaining, clock_mode, convertTime, tick_rate, dispatch } = useContext(ClockContext);

  useEffect(() => {
    setTimeout(() => {
      if (clock_status === status.RUNNING) {
        _tick_clock();
      }
    }, tick_rate);
  })

  function _tick_clock() {
    console.log("Tick");
    if (time_remaining <= 0) {
      _ring_alarm();
      _clock_switchover();
    } else {
      dispatch({ type: act.SET_TIME_REMAINING, value: (session_end - Date.now()) })
    }
  }

  function _ring_alarm() {
    document.getElementById("audio").play();
  }

  function _clock_switchover() {
    dispatch({ type: act.SWITCH_MODE });
  }


  function _play_button() {
    if (clock_status === status.RUNNING) {
      dispatch({ type: act.PAUSE_CLOCK });
    } else if (clock_status === status.STOPPED) {
      dispatch({ type: act.START_CLOCK })
    } else if (clock_status === status.PAUSED) {
      dispatch({ type: act.RESUME_CLOCK })
    }
  }

  function _reset_button() {
    dispatch({ type: act.RESET_CLOCK })
  }

  return (
    <div>
      <h1>Display</h1>
      <p id='timer-label'>{clock_mode === mode.SESSION ? "Session" : "Break"}</p>
      <p id="time-left">{time_remaining >= 0 ? convertTime(time_remaining) : convertTime(0)}</p>
      <button onClick={_play_button}>Play/Pause</button>
      <button onClick={_reset_button}>Reset</button>
      <audio id="audio" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" autoPlay={false} ></audio>
    </div>
  );
}

export default Display;