import React from "react";

import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FolderIcon from "@material-ui/icons/Folder";

import MoreOptions from "./moreOptions";

import { ItemContainer } from "./styledComps";

const StyledItemContainer = styled(ItemContainer)`
  background-color: #2e3138;
`;

const ItemContainerHeader = styled.div`
  text-align: left;
  padding: 5px;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`;

const ItemContainerArea = styled.div`
  height: 160px;
  overflow-y: auto;
  border: 1px solid #546beb;
  border-radius: 4px;
  background-color: #546beb;
`;

const StyledHeading = styled.h3`
  flex-grow: 1;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 10px;
`;

type ItemDisplayPropsType = {
  type: string;
  itemHeader: string;
  subItemsList?: { id: number; name: string }[];
  goToSubItem: (id: string | number) => void;
  options: {
    optionTitle: string;
    optionFunction: () => void;
  }[];
};

const ItemDisplay: React.FC<ItemDisplayPropsType> = ({
  type,
  itemHeader,
  subItemsList,
  goToSubItem,
  options,
}) => {
  const NoSubItems = () => {
    let noSubItemsTitle = "";
    if (type === "Workspace") {
      noSubItemsTitle = "No Projects in this Workspace";
    } else {
      noSubItemsTitle = "No Tickets in this Project";
    }
    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {noSubItemsTitle}
      </div>
    );
  };

  const ItemList = () => {
    return (
      <div>
        {subItemsList && subItemsList.length > 0 ? (
          <List>
            {subItemsList
              .sort((currentSub, prevSub) => {
                const currentSubName = currentSub.name.toLocaleLowerCase();
                const prevSubName = prevSub.name.toLocaleLowerCase();

                return currentSubName.localeCompare(prevSubName, undefined, {
                  numeric: true,
                  ignorePunctuation: true,
                });
              })
              .map((subItem, index) => (
                <ListItem
                  key={`${index}-${subItem.id}-${subItem.name}`}
                  button
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    goToSubItem(subItem.id);
                    event.stopPropagation();
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={subItem.name} />
                </ListItem>
              ))}
          </List>
        ) : (
          <NoSubItems />
        )}
      </div>
    );
  };

  return (
    <StyledItemContainer>
      <ItemContainerHeader>
        <StyledHeading>
          {itemHeader.length > 21
            ? `${itemHeader.slice(0, 22)}...`
            : itemHeader}
        </StyledHeading>
        <MoreOptions options={options} />
      </ItemContainerHeader>
      <ItemContainerArea>
        <ItemList />
      </ItemContainerArea>
    </StyledItemContainer>
  );
};

export default ItemDisplay;
