import React, { useState, useEffect } from "react";

import { useParams, RouteComponentProps, withRouter } from "react-router-dom";

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
  const [fetchProjectError, setFetchProjectError] = useState<
    string | undefined
  >();

  const onProjectDelete = async () => {};

  const toggleDeleteForm = () => setIsDeleteFormOpen(!isDeleteFormOpen);

  const onProjectNameUpdate = async (newName: string) => {
    try {
      if (project) {
        const response = await fetch(
          `/api/update-project-name/${project.id}/${newName}`,
          {
            method: "PUT",
            headers: addAuthHeaders(),
          }
        );
        const result = await response.json();

        if (result) {
          console.log(result);
          const { success, response, msg } = result;
          if (success && response) {
          }
          if (!success && msg) {
            console.error(msg);
          }
        }
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
          console.log("userProject->", userProject);
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
  }, [projectId, setProject, setIsLoading, setFetchProjectError]);

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
            options={[]}
          />
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
            </PannelContainer>
          </Pannel>
        </div>
      )}
    </PaperBackground>
  );
};

export default withRouter(Project);
