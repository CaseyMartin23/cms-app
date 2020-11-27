import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import { PaperHeader, SpanInput, EditableSpan } from "./styledComps";

type EditableHeaderPropsType = {
  title: string;
};

const EditableHeader: React.FC<EditableHeaderPropsType> = ({ title }) => {
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  const onWorkspaceNameDoubleClick = () => {
    setIsEditable(true);
  };

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value;
    setInputValue(currentInputValue);
  };

  const onSpanInputClose = () => {
    setIsEditable(false);
    setInputValue(title);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditable(false);
  };

  useEffect(() => {
    console.log("inputValue->", inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (isEditable) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditable, inputRef]);

  return (
    <PaperHeader>
      <EditableSpan
        hidden={isEditable}
        onDoubleClick={onWorkspaceNameDoubleClick}
      >
        {inputValue}
      </EditableSpan>
      <form hidden={!isEditable} onSubmit={onFormSubmit}>
        <SpanInput
          ref={inputRef}
          hidden={!isEditable}
          value={inputValue}
          onChange={onInputValueChange}
        />
        <Button type="submit">save</Button>
        <Button onClick={onSpanInputClose}>close</Button>
      </form>
    </PaperHeader>
  );
};

export default EditableHeader;
