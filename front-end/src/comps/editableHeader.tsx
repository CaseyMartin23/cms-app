import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import MoreOptions, { OptionsType } from "./moreOptions";

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
  /* padding-left: 5px; */
  background: none;
  border: none;
  height: 100%;
  width: 300px;
  &:focus {
    outline: none;
    border-bottom: solid #3f51b5 2px;
  }
`;

const StyledButton = styled(Button)`
  margin: 5px;
  box-shadow: none;
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
  margin-top: 5px;
  margin-bottom: 5px;
  opacity: 0.7;
`;

type EditableItemType = {
  id: number;
  owned_by: string;
  workspace?: number;
  project_repo?: string;
  name?: string;
  title?: string;
  description?: string;
  ticket_time?: number;
  project?: number;
  ticket_repo?: string;
};

type EditableHeaderPropsType = {
  editableItem: EditableItemType;
  onUpdateTitle: (newTitle: string | undefined) => void;
  options: OptionsType;
};

const EditableHeader: React.FC<EditableHeaderPropsType> = ({
  editableItem,
  onUpdateTitle,
  options,
}) => {
  const title = editableItem.title ? editableItem.title : editableItem.name;
  const [inputValue, setInputValue] = useState(title);
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onTitleDoubleClick = () => {
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

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      onUpdateTitle(inputValue);
    } catch (err) {
      console.error(err);
      setInputValue(title);
    }
    setIsEditable(false);
  };

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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flexGrow: 1 }}>
            <EditableSpan
              hidden={isEditable}
              onDoubleClick={onTitleDoubleClick}
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
              <StyledButton type="submit" color="primary" variant="contained">
                save
              </StyledButton>
              <StyledButton
                onClick={onSpanInputClose}
                color="secondary"
                variant="contained"
              >
                close
              </StyledButton>
            </form>
          </div>
          <MoreOptions options={options} />
        </div>
      </HeaderFontStyle>
      <OwnerLabel>Owned By: {editableItem.owned_by}</OwnerLabel>
    </PaperHeader>
  );
};

export default EditableHeader;
