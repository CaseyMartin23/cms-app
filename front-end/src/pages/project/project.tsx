import React, { useState, useEffect } from "react";

import {
  useParams,
  RouteComponentProps,
  withRouter,
  Redirect,
} from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";

import { ErrorMessageDiv } from "../../comps/styledComps";

import { addAuthHeaders } from "../../utils";

import DeleteItemForm from "../../comps/deleteItemForm";
import EditableHeader from "../../comps/editableHeader";

import TicketDisplay from "../ticket/ticketDisplay";

import {
  Pannel,
  PannelContainer,
  PaperBackground,
} from "../../comps/styledComps";

type ProjectTicketType = {
  id: number;
  name: string;
  description?: string;
  state: string;
};

type ProjectType = {
  id: number;
  name: string;
  workspace: string;
  owned_by: string;
  project_repo: string;
  tickets: ProjectTicketType[];
};

interface ProjectPropsType extends RouteComponentProps {
  reloadProjects: () => void;
}

const Project: React.FC<ProjectPropsType> = ({ reloadProjects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [fetchProjectError, setFetchProjectError] = useState<
    string | undefined
  >();

  const onProjectDelete = async () => {
    try {
      if (project) {
        await fetch(`/api/delete-project/${project.id}`, {
          method: "DELETE",
          headers: addAuthHeaders(),
        });
        toggleDeleteForm();
        reloadProjects();
        setRedirect(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDeleteForm = () => setIsDeleteFormOpen(!isDeleteFormOpen);

  const onProjectNameUpdate = async (newName: string) => {
    try {
      if (project && newName && newName.toString().trim().length > 0) {
        await fetch("/api/update-project-name/", {
          method: "PUT",
          headers: addAuthHeaders(),
          body: JSON.stringify({ projectId: project.id, newName }),
        });

        reloadProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/project/${projectId}`, {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, userProject } = result;
          if (
            success &&
            userProject &&
            JSON.stringify(userProject) !== JSON.stringify(project)
          ) {
            setProject(userProject);
          }
          if (!success && msg) {
            setFetchProjectError(msg);
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    getProject();
  }, [projectId, project, setProject, setIsLoading, setFetchProjectError]);

  if (redirect) return <Redirect to="/dashboard/projects" />;
  return (
    <PaperBackground>
      <DeleteItemForm
        isFormOpen={isDeleteFormOpen}
        onDeleteItem={onProjectDelete}
        onToggleForm={toggleDeleteForm}
        title="Are you sure you want to DELETE this Project and ALL it's contents?"
      />
      {project && (
        <div>
          <EditableHeader
            editableItem={project}
            onUpdateTitle={onProjectNameUpdate}
            options={[
              {
                optionTitle: "Delete Project",
                optionFunction: toggleDeleteForm,
              },
            ]}
          />
          {!project && !fetchProjectError && isLoading && <LinearProgress />}
          <Pannel>
            <PannelContainer>
              {project.tickets.length > 0 &&
                project.tickets.map(
                  (ticket: ProjectTicketType, index: number) => (
                    <div key={`${ticket.id}-${index}-${ticket.name}`}>
                      <TicketDisplay ticket={ticket} />
                    </div>
                  )
                )}
              {!project && !isLoading && fetchProjectError && (
                <ErrorMessageDiv>{fetchProjectError}</ErrorMessageDiv>
              )}
            </PannelContainer>
          </Pannel>
        </div>
      )}
    </PaperBackground>
  );
};

export default withRouter(Project);
