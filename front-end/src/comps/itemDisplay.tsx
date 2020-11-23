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
            {subItemsList.map((subItem) => (
              <ListItem key={`${subItem.id}`} button>
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
