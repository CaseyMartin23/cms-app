import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { addAuthHeaders } from "../../utils";

import DeleteItemForm from "../../comps/deleteItemForm";
import EditableHeader from "../../comps/editableHeader";
import {
  Pannel,
  PannelContainer,
  PaperBackground,
} from "../../comps/styledComps";

type ProjectType = {
  id: number;
  name: string;
  workspace: string;
  owned_by: string;
  project_repo: string;
  tickets: { id: number; name: string }[];
};

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [fetchProjectError, setFetchProjectError] = useState<
    string | undefined
  >();

  const onProjectDelete = async () => {};

  const toggleDeleteForm = () => {};

  const onProjectNameUpdate = async (newName: string | undefined) => {};

  useEffect(() => {
    const getProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/project/${projectId}`, {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, project } = result;
          if (!success && msg) {
            setFetchProjectError(msg);
          }
          if (success && project) {
            setProject(project);
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
              {project.tickets.length > 1 &&
                project.tickets.map(
                  (ticket: { id: number; name: string }, index: number) => (
                    <div key={`${ticket.id}-${index}-${ticket.name}`}></div>
                  )
                )}
            </PannelContainer>
          </Pannel>
        </div>
      )}
    </PaperBackground>
  );
};

export default Project;
