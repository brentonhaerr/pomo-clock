import React, { useContext, useEffect, useRef } from 'react';
import { ClockContext } from '../contexts/ClockContext';
import * as status from '../constants/clock_status';
import * as act from '../constants/actions';
import * as mode from '../constants/clock_modes';

const Display = () => {
  const { session_end, session_length, clock_status, time_remaining, clock_mode, convertTime, tick_rate, dispatch } = useContext(ClockContext);

  const audio_element = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (clock_status === status.RUNNING) {
        _tick_clock();
      }
    }, tick_rate);
  })

  function _tick_clock() {
    if (time_remaining < 1000 && audio_element.current.paused) {
      // Start playing the alarm sound when we hit 00:00 and if the audio is 
      // NOT playing.
      audio_element.current.play();
    }
    if (time_remaining <= 0) {
      _clock_switchover();
    } else {
      dispatch({ type: act.SET_TIME_REMAINING, value: (session_end - Date.now()) })
    }
  }

  function _clock_switchover() {
    dispatch({ type: act.SWITCH_MODE });
  }


  function _play_button() {
    switch (clock_status) {
      case status.RUNNING:
        dispatch({ type: act.PAUSE_CLOCK });
        break;
      case status.STOPPED:
        dispatch({ type: act.START_CLOCK })
        break;
      case status.PAUSED:
        dispatch({ type: act.RESUME_CLOCK })
        break;
      default:
        console.log("Unexpected value in _play_button");
        break;
    }
  }

  Audio.prototype.stop = function () {
    // Add stop function to Audio class to allow for quick-stopping alarm sound
    // when using the reset button.
    this.pause();
    this.currentTime = 0;
  }

  function _reset_button() {
    dispatch({ type: act.RESET_CLOCK })
    audio_element.current.stop();
  }

  function _display_value() {
    if (clock_status !== status.STOPPED) {
      return time_remaining >= 0 ? convertTime(time_remaining) : convertTime(0);
    } else {
      return convertTime(session_length, false, false);
    }
  }

  return (
    <div>
      <h1>Display</h1>
      <p id='timer-label'>{clock_mode === mode.SESSION ? "Session" : "Break"}</p>
      <p id="time-left">{_display_value()}</p>
      <button id="start_stop" onClick={_play_button}>Play/Pause</button>
      <button id="reset" onClick={_reset_button}>Reset</button>
      <audio id="beep" ref={audio_element} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" autoPlay={false} ></audio>
    </div>
  );
}

export default Display;