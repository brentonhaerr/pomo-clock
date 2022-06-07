import React, { useContext, useEffect } from 'react';
import { ClockContext } from '../contexts/ClockContext';
import * as status from '../constants/clock_status';
import * as act from '../constants/actions';

const Display = () => {
  const { session_end, clock_status, time_remaining, convertTime, tick_rate, dispatch } = useContext(ClockContext);

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
      console.log("Clock finished! Time drift: " + (Date.now() - session_end));
      document.getElementById("audio").play();
    } else {
      dispatch({ type: act.SET_TIME_REMAINING, value: (session_end - Date.now()) })
    }
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

  return (
    <div>
      <h1>Display</h1>
      <p>Session</p>
      <p id="time-left">{time_remaining >= 0 ? convertTime(time_remaining) : convertTime(0)}</p>
      <button onClick={_play_button}>Play/Pause</button>
      <button>Reset</button>
      <audio id="audio" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" autoplay="false" ></audio>
    </div>
  );
}

export default Display;