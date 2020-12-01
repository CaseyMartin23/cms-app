import React, { useEffect, useRef, useState } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {
  PaperHeader,
  SpanInput,
  EditableSpan,
  HeaderFontStyle,
} from "./styledComps";

type EditableHeaderPropsType = {
  title: string;
  owned_by: string;
};

const EditableHeader: React.FC<EditableHeaderPropsType> = ({
  title,
  owned_by,
}) => {
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
      <HeaderFontStyle>
        <div>
          <EditableSpan
            hidden={isEditable}
            onDoubleClick={onWorkspaceNameDoubleClick}
          >
            {inputValue}
          </EditableSpan>
          {!isEditable && <EditIcon opacity="0.4" />}
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
          <IconButton style={{ float: "right" }}>
            <MoreVertIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </HeaderFontStyle>
      <span>{owned_by}</span>
    </PaperHeader>
  );
};

export default EditableHeader;
