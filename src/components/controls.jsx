import React, { useContext } from 'react';
import { ClockContext } from '../contexts/ClockContext';
import * as act from '../constants/actions';

const Controls = () => {
  const { break_length, session_length, convertTime, dispatch } = useContext(ClockContext);

  function _timer_change(session, increase) {
    let timer = (session ? "session" : "break");
    let direction = (increase ? "up" : "down");

    dispatch({ type: act.ADJUST_TIMER, timer, direction });
  }

  return (
    <section id="controls">
      <div className="box">
        <button id="session-increment" onClick={() => { _timer_change(true, true) }}>Up</button>
        <span id="session-label"> Session Length: </span>
        <span id="session-length">{convertTime(session_length, true)}</span>
        <button id="session-decrement" onClick={() => { _timer_change(true, false) }}>Down</button>
      </div>
      <div className="box">
        <button id="break-increment" onClick={() => { _timer_change(false, true) }}>Up</button>
        <span id="break-label">Break Length: </span>
        <span id="break-length">{convertTime(break_length, true)}</span>
        <button id="break-decrement" onClick={() => { _timer_change(false, false) }}>Down</button>
      </div>
    </section>
  );
}

export default Controls;