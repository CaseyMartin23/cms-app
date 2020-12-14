import React, { useRef } from "react";

import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const DropdownDiv = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: white;
  color: black;
  width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
`;

export type OptionsType = {
  optionTitle: string;
  optionFunction: () => void | Promise<void>;
}[];

type MoreOptionsPropsType = {
  options: OptionsType;
};

const MoreOptions: React.FC<MoreOptionsPropsType> = ({ options }) => {
  const optionsContentRef = useRef<HTMLDivElement>(null);

  const onMoreOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (optionsContentRef && optionsContentRef.current) {
      const optionContent = optionsContentRef.current.style;

      if (optionContent.display === "") {
        optionContent.display = "block";
      } else {
        optionContent.display = "";
      }
    }
  };

  return (
    <DropdownDiv>
      <IconButton onClick={onMoreOptionsClick}>
        <MoreVertIcon style={{ color: "white" }} />
      </IconButton>
      <DropdownContent ref={optionsContentRef}>
        <List>
          {options &&
            options.length > 0 &&
            options.map((option, index) => (
              <ListItem
                key={`${index}-${option.optionTitle}`}
                button
                onClick={(event) => {
                  onMoreOptionsClick(event);
                  option.optionFunction();
                }}
              >
                <ListItemText primary={`${option.optionTitle}`} />
              </ListItem>
            ))}
        </List>
      </DropdownContent>
    </DropdownDiv>
  );
};

export default MoreOptions;
