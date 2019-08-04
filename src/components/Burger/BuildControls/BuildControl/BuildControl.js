import React from 'react';

import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <button className={classes.Less} onClick={props.removeClicked} disabled={props.btnRemoveDisabled}>-</button>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} onClick={props.addClicked} disabled={props.btnAddDisabled}>+</button>
    </div>
);

export default buildControl;