import React, { useState } from 'react';
import classes from './Toggle.module.css';
import { iToggleButton } from '../../../../src/interfaces/UI/button/Toggle.interface';

export const Toggle = (props: iToggleButton) => {
  const [toggled, setToggled] = useState(false);
  return (
    <div className={classes.toggleBlock}>
  
      <button
        className={`${classes.toggleBtn}  ${toggled ? classes.toggled : ''}`}
        onClick={() => setToggled(!toggled)}
      >
        <div className={classes.thumb}></div>
      </button>
      <p className={classes.toggleParragraph}>{props.text}</p>
    </div>
  );
};
