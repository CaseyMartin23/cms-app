import React from "react";

import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FolderIcon from "@material-ui/icons/Folder";

const ItemContainer = styled.div`
  border: 1px solid blue;
  border-radius: 4px;
  padding: 10px 20px 20px;
  width: 300px;
  margin: 8px;
`;

const ItemContainerHeader = styled.div`
  text-align: left;
  margin-bottom: 5px;
  padding: 5px;
`;

const ItemContainerArea = styled.div`
  height: 160px;
  overflow-y: auto;
  border: 1px solid #6b6b6b;
  border-radius: 4px;
  background-color: #6b6b6b;
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
      <ItemContainerHeader>{itemHeader}</ItemContainerHeader>
      <ItemContainerArea>
        <ItemList />
      </ItemContainerArea>
    </ItemContainer>
  );
};

export default ItemDisplay;
