import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FolderIcon from "@material-ui/icons/Folder";

import {
  ItemContainer,
  ItemContainerArea,
  ItemContainerHeader,
} from "./styledComps";

type ItemDisplayPropsType = {
  itemHeader: string;
  subItemsList?: string[];
};

const ItemDisplay: React.FC<ItemDisplayPropsType> = ({
  itemHeader,
  subItemsList,
}) => {
  const ItemList = () => {
    return (
      <List>
        {subItemsList &&
          subItemsList.length > 0 &&
          subItemsList.map((subItem, index) => (
            <ListItem key={`${index}`} button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={subItem} />
            </ListItem>
          ))}
      </List>
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
