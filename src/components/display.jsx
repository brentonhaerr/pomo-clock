import React, { useContext, useEffect } from 'react';
import { ClockContext } from '../contexts/ClockContext';
import * as status from '../constants/clock_status';
import * as act from '../constants/actions';

const Display = () => {
  const { session_end, clock_status, time_remaining, convertTime, dispatch } = useContext(ClockContext);

  useEffect(() => {
    let _tick_rate = 500;
    setTimeout(() => {
      if (clock_status === status.RUNNING) {
        _tick_clock();
      }
    }, _tick_rate);
  })

  function _tick_clock() {
    console.log("Tick");
    dispatch({ type: act.SET_TIME_REMAINING, value: (session_end - Date.now() )})
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
      <p id="time-left">{convertTime(time_remaining)}</p>
      <button onClick={_play_button}>Play/Pause</button>
      <button>Reset</button>
    </div>
  );
}

export default Display;