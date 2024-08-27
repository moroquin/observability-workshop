import React from 'react';
import { iProps } from '../../interfaces/components/OperationList/OperationItem.interface';
import classes from './OperationItem.module.css';

export const OperationItem = (props: iProps) => {
  return (
    <li className={classes.item} key={props.id}>
      <p>{props.operation.operationText} {(props.operation.error)?` ---Error---: ${props.operation.message}`: ""}</p>

      <button className={classes.search_button}>
        
        
      </button>
    </li>
  );
};

//<Trash width={20} height={20} />