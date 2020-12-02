import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const PaperHeader = styled.div`
  background-color: #6b6b6b;
  padding: 20px 30px;
  height: 115px;
  box-sizing: border-box;
`;

const SpanInput = styled.input`
  font: inherit;
  color: inherit;
  text-align: inherit;
  padding: 0;
  background: none;
  border: none;
  height: 100%;
`;

const EditableSpan = styled.span`
  padding-top: 9px;
  padding-bottom: 9px;
  width: 195px;
  height: 36px;
`;

const HeaderFontStyle = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const OwnerLabel = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 0.7;
`;

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
          <div>
            <IconButton style={{ float: "right" }}>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
            <div></div>
          </div>
        </div>
      </HeaderFontStyle>
      <OwnerLabel>Owned By: {owned_by}</OwnerLabel>
    </PaperHeader>
  );
};

export default EditableHeader;
