import React from 'react'
import classes from './Latches.module.css';
import { Article } from '../UI/Article';
import { Toggle } from '../UI/button/Toggle';

export const Latches = () => {
  return (
    <Article className={classes.article}>
      <>
        <h2>Insert new operation</h2>
        <p className={classes.comment}>Enable or disable the latches.</p>
        <Toggle text="toggle1"/>
        <Toggle text="toggle2"/>
      </>
    </Article>
  )
}
