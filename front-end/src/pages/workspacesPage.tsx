import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from "@material-ui/icons/Folder";

import {
  Pannel,
  PannelContainer,
  ItemContainer,
  ItemContainerHeader,
  ItemContainerArea,
} from "../comps/styledComps";

const WorkspacesPage = () => {
  return (
    <div>
      <Toolbar>
        <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h4">
          Workspaces
        </Typography>
        <Button style={{ backgroundColor: "#3f51b5" }} color="inherit">
          Create Workspace
        </Button>
      </Toolbar>
      <Pannel>
        <PannelContainer>
          <ItemContainer>
            <ItemContainerHeader>Workspace's Name</ItemContainerHeader>
            <ItemContainerArea>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
              </List>
            </ItemContainerArea>
          </ItemContainer>
          <ItemContainer>
            <ItemContainerHeader>Workspace's Name</ItemContainerHeader>
            <ItemContainerArea>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
              </List>
            </ItemContainerArea>
          </ItemContainer>
          <ItemContainer>
            <ItemContainerHeader>Workspace's Name</ItemContainerHeader>
            <ItemContainerArea>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="project in workspace" />
                </ListItem>
              </List>
            </ItemContainerArea>
          </ItemContainer>
        </PannelContainer>
      </Pannel>
    </div>
  );
};

export default WorkspacesPage;
