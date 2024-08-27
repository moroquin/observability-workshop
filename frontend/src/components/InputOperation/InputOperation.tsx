import React, { useState, SyntheticEvent } from "react";
import classes from "./InputOperation.module.css";
import { Article } from "../UI/Article";

export const InputOperation = () => {
  const [errorInput, setErrorInput] = useState(false);
  const apiUrl: string = process.env.REACT_APP_BACKEND_URL || "localhost:3000";
  const apiKey: string = process.env.REACT_APP_BACKEND_API_KEY || "";

  const formSubmissionHandler = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      operationTextInput: { value: string };
    };
    const operationText = formElements.operationTextInput.value;

    if (operationText.length === 0) {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);

    const setData = async (operation: string, url: string) => {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ operationText: operation }),
      });
      if (!response.ok) {
        console.log("error");
        return;
      }
      await response.json();
    };

    await setData(operationText, apiUrl);
  };

  return (
    <Article className={classes.article}>
      <>
        <h2>Insert new operation</h2>
        <p className={classes.comment}>
          Insert the operation you want to execute
        </p>
        <form onSubmit={formSubmissionHandler}>
          <label>
            Operation:
            <input
              type="text"
              id="operationTextInput"
              name="operationTextInput"
              className={classes.inputName}
            />
          </label>
          {errorInput && (
            <p className={classes.error}>Error, you must write an operation.</p>
          )}
          <br />
          <input
            id="namesubmitcomponent"
            type="submit"
            value="Execute"
            className={classes.submit}
          />
        </form>
      </>
    </Article>
  );
};
