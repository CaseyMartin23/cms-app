import React from "react";

import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FolderIcon from "@material-ui/icons/Folder";

import MoreOptions from "./moreOptions";

const ItemContainer = styled.div`
  border: 2px solid #3f51b5;
  border-radius: 4px;
  padding: 10px 20px 20px;
  width: 300px;
  margin: 8px;
`;

const ItemContainerHeader = styled.div`
  text-align: left;
  padding: 5px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ItemContainerArea = styled.div`
  height: 160px;
  overflow-y: auto;
  border: 1px solid #6b6b6b;
  border-radius: 4px;
  background-color: #6b6b6b;
`;

const StyledHeading = styled.h3`
  flex-grow: 1;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
`;

type ItemDisplayPropsType = {
  itemHeader: string;
  subItemsList?: { id: number; name: string }[];
};

const ItemDisplay: React.FC<ItemDisplayPropsType> = ({
  itemHeader,
  subItemsList,
}) => {
  const ItemList = () => {
    return (
      <div>
        {subItemsList && subItemsList.length > 0 ? (
          <List>
            {subItemsList.map((subItem, index) => (
              <ListItem key={`${index}-${subItem.id}-${subItem.name}`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={subItem.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          "No projects in this workspace"
        )}
      </div>
    );
  };

  return (
    <ItemContainer>
      <ItemContainerHeader>
        <StyledHeading>{itemHeader}</StyledHeading>
        <MoreOptions
          options={[
            {
              optionTitle: "Test Item",
              optionFunction: () => {
                console.log("Item got clicked!!");
              },
            },
          ]}
        />
      </ItemContainerHeader>
      <ItemContainerArea>
        <ItemList />
      </ItemContainerArea>
    </ItemContainer>
  );
};

export default ItemDisplay;
