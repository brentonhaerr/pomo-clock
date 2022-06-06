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
      clock_type,
      session_length,
      break_length
    },
    dispatch] = useReducer(ClockReducer, {
      session_length: (25 * 60 * 1000),
      break_length: (5 * 60 * 1000),
      clock_status: stat.STOPPED,
      clock_type: mode.SESSION
    })

  function convert_time(time, mins_only = false) {
    // return a string of mm:ss
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    if (seconds < 10) { seconds = "0" + seconds };
    if (mins_only) {
      return minutes;
    }
    return minutes + ":" + seconds;
  }

  return (
    <ClockContext.Provider value={{ session_start, session_end, time_remaining, clock_status, clock_type, session_length, break_length, convert_time, dispatch }}>
      {props.children}
    </ClockContext.Provider>
  );
}

export default ClockContextProvider;