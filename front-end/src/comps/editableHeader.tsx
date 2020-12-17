import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

import MoreOptions, { OptionsType } from "./moreOptions";

import { StyledButton } from "./styledComps";

const PaperHeader = styled.div`
  background-color: #6b6b6b;
  padding: 20px 30px;
  height: 130px;
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
  width: 300px;
  &:focus {
    outline: none;
    border-bottom: solid #3f51b5 2px;
  }
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

const ItemDetails = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  opacity: 0.7;
`;

const Detail = styled(Typography)`
  margin-left: 5px;
  margin-right: 5px;
`;

type EditableItemType = {
  id: number;
  name: string;
  owned_by: string;
  workspace?: number;
  project_repo?: string;
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
  const [inputValue, setInputValue] = useState(editableItem.name);
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
    setInputValue(editableItem.name);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      onUpdateTitle(inputValue);
    } catch (err) {
      console.error(err);
      setInputValue(editableItem.name);
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
              <StyledButton
                style={{ margin: "5px" }}
                type="submit"
                color="primary"
                variant="contained"
              >
                save
              </StyledButton>
              <StyledButton
                style={{ margin: "5px" }}
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
      <ItemDetails>
        <Detail>owned by: {editableItem.owned_by}</Detail>
      </ItemDetails>
    </PaperHeader>
  );
};

export default EditableHeader;
