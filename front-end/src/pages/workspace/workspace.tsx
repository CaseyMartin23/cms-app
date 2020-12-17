import React, { useEffect, useState } from "react";

import { addAuthHeaders } from "../../utils";

import {
  Redirect,
  useParams,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import ItemDisplay from "../../comps/itemDisplay";
import EditableHeader from "../../comps/editableHeader";
import DeleteItemForm from "../../comps/deleteItemForm";

import {
  PaperBackground,
  Pannel,
  PannelContainer,
} from "../../comps/styledComps";

type WorkspaceProjectType = {
  id: number;
  name: string;
  tickets: { id: number; name: string }[];
};

type WorkspaceType = {
  id: number;
  name: string;
  owned_by: string;
  projects: WorkspaceProjectType[];
};

interface WorkspacePropsType extends RouteComponentProps {
  reloadWorkspaces: () => void;
}

const Workspace: React.FC<WorkspacePropsType> = ({
  reloadWorkspaces,
  history,
}) => {
  const [workspace, setWorkspace] = useState<WorkspaceType>();
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const onDeleteFormToggle = () => setIsDeleteFormOpen(!isDeleteFormOpen);

  const onDeleteWorkspace = async () => {
    try {
      if (workspace) {
        await fetch(`/api/delete-workspace/${workspace.id}`, {
          method: "DELETE",
          headers: addAuthHeaders(),
        });
        onDeleteFormToggle();
        reloadWorkspaces();
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateTitle = async (newTitle: string | undefined) => {
    try {
      if (workspace && newTitle && newTitle.toString().trim().length > 0) {
        await fetch("/api/update-workspace-name", {
          method: "PUT",
          headers: addAuthHeaders(),
          body: JSON.stringify({ id: workspace.id, name: newTitle }),
        });
        reloadWorkspaces();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToTicket = (id: string | number) => {
    history.push(`/dashboard/tickets/${id}`);
  };

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`, {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result && JSON.stringify(workspace) !== JSON.stringify(result)) {
          setWorkspace(result);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getWorkspace();
  }, [workspaceId, workspace, setWorkspace]);

  if (redirect) return <Redirect to="/dashboard/workspaces" />;
  return (
    <PaperBackground>
      <DeleteItemForm
        isFormOpen={isDeleteFormOpen}
        onDeleteItem={onDeleteWorkspace}
        onToggleForm={onDeleteFormToggle}
        title="Are you sure you want to delete this Workspace and all it's contents?"
      />
      {workspace && (
        <div>
          <EditableHeader
            editableItem={workspace}
            onUpdateTitle={onUpdateTitle}
            options={[
              {
                optionTitle: "Delete Workspace",
                optionFunction: onDeleteFormToggle,
              },
            ]}
          />
          <Pannel>
            <PannelContainer>
              {workspace.projects.length > 0 &&
                workspace.projects.map(
                  (project: WorkspaceProjectType, index: number) => (
                    <div
                      key={`${project.id}-${index}-${project.name}`}
                      onClick={() =>
                        history.push(`/dashboard/projects/${project.id}`)
                      }
                    >
                      <ItemDisplay
                        type="Project"
                        itemHeader={project.name}
                        subItemsList={project.tickets}
                        goToSubItem={goToTicket}
                        options={[
                          {
                            optionTitle: "",
                            optionFunction: () => {},
                          },
                        ]}
                      />
                    </div>
                  )
                )}
            </PannelContainer>
          </Pannel>
        </div>
      )}
    </PaperBackground>
  );
};

export default withRouter(Workspace);
