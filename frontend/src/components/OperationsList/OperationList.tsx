import React, { useState } from 'react';
import classes from './OperationList.module.css';
import { Article } from '../UI/Article';
import { OperationItem } from './OperationItem';

interface iOperation {
  type: string;
  operationText: string;
  result: number;
  error: boolean;
  message: string;
  id: number;
}

interface iOperationArray {
  operations: iOperation[];
}

interface iResponse {
  error: boolean;
  operations: iOperation[];
}

export const OperationList = () => {
  const [operationsList, setOperationsList] = useState<iOperationArray>({
    operations: [],
  });
  const apiUrl: string = process.env.REACT_APP_BACKEND_URL || "localhost:3000";
  const apiKey: string = process.env.REACT_APP_BACKEND_API_KEY || "";

  const getData = async (): Promise<iResponse> => {
    const request = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-api-key": apiKey,
      },
    });
    if (!request.ok) {
      return {
        error: true,
        operations: [],
      };
    }

    const response = await request.json();

    return {
      error: false,
      operations: response.operations,
    };
  };

  const refreshList = async () => {
    const data = await getData();
    if (data.error) {
      setOperationsList({ operations: [] });
      return;
    }
    setOperationsList({ operations: data.operations });
  };

  return (
    <Article className={classes.article}>
      <>
        <h2>History operations executed</h2>
        <button onClick={refreshList}>Refresh list</button>
        <ul id="genderlistcomponentul" className={classes.list}>
          {operationsList.operations.map((item) => (
            <OperationItem key={item.id} operation={item} id={item.id} />
          ))}
        </ul>
      </>
    </Article>
  );
};
