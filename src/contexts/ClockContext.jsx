import React, { createContext, useReducer } from 'react';
import { ClockReducer } from '../reducers/ClockReducer';
import * as mode from '../constants/clock_modes';
import * as stat from '../constants/clock_status';

export const ClockContext = createContext();

const ClockContextProvider = (props) => {
  const [
    {
      session_start,
      session_end,
      time_remaining,
      clock_status,
      clock_mode,
      session_length,
      break_length,
      tick_rate
    },
    dispatch] = useReducer(ClockReducer, {
      session_length: (25 * 60 * 1000),
      break_length: (5 * 60 * 1000),
      clock_status: stat.STOPPED,
      clock_mode: mode.SESSION,
      tick_rate: 250, 
      time_remaining: (3*60*1000)
    })

  function convertTime(time, mins_only, for_controls = false) {
    // return a string of mm:ss
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    if (seconds < 10) { seconds = "0" + seconds };
    // don't add the 0 to minutes when they go in the controls component
    if (minutes < 10 && !for_controls) { minutes = "0" + minutes };
    if (mins_only) {
      return minutes;
    }
    return minutes + ":" + seconds;
  }

  return (
    <ClockContext.Provider value={{ session_start, session_end, time_remaining, clock_status, clock_mode, session_length, break_length, tick_rate, convertTime, dispatch }}>
      {props.children}
    </ClockContext.Provider>
  );
}

export default ClockContextProvider;