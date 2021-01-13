import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { addAuthHeaders } from "../../utils";

import Project from "./project";
import ProjectForm from "./projectForm";

import DeleteItemForm from "../../comps/deleteItemForm";
import PageTitlebar from "../../comps/pagesTitlebar";
import ItemDisplay from "../../comps/itemDisplay";
import {
  Pannel,
  PannelContainer,
  ErrorMessageDiv,
} from "../../comps/styledComps";

const ProjectWorkspace = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #3a3f4a;
  border: 1px solid #3a3f4a;
  border-radius: 5px;
`;

const WorkspaceTitleFlexDiv = styled.div`
  display: flex;
  padding: 8px;
  color: white;
`;

type WorkspaceTitleHrProps = {
  flexGrow: number;
};

const WorkspaceTitleHr = styled.hr`
  border: 0;
  height: 0;
  background-color: #3f51b5;
  border-bottom: 1px solid;
  border-top: 1px solid;
  flex-grow: ${(props: WorkspaceTitleHrProps) =>
    props.flexGrow && props.flexGrow};
`;

type ProjectType = {
  id: number;
  name: string;
  workspace: { id: number; name: string };
  tickets: { id: number; name: string }[];
};

type ProjectWorkspaceType = {
  id: number;
  name: string;
};

type ProjectWorkspaceTitleProps = {
  workspaceTitle: string;
};

interface ProjectsPagePropsType extends RouteComponentProps {}

const ProjectsPage: React.FC<ProjectsPagePropsType> = ({ match, history }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [projectsWorkspaces, setProjectsWorkspaces] = useState<
    { id: number; name: string }[]
  >([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [isLoadingProjects, setIsLoadingPropjects] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number>();
  const [fetchProjectsError, setFetchProjectsError] = useState<
    string | undefined
  >();

  const onProjectFormToggle = () => {
    setIsProjectFormOpen(!isProjectFormOpen);
  };

  const goToRoute = (id: string | number) => {
    history.push(`${match.url}/${id}`);
  };

  const reloadProjects = () => {
    setProjects([]);
  };

  const toggleDeleteForm = (projectId?: number) => {
    setIsDeleteFormOpen(!isDeleteFormOpen);
    setProjectToDelete(projectId);
  };

  const onDeleteProject = async () => {
    try {
      if (projectToDelete) {
        const response = await fetch(`/api/delete-project/${projectToDelete}`, {
          method: "DELETE",
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result && result.success) reloadProjects();
      }
    } catch (err) {
      console.error(err);
    }
    toggleDeleteForm();
  };

  const ProjectWorkspaceTitle: React.FC<ProjectWorkspaceTitleProps> = ({
    workspaceTitle,
  }) => (
    <WorkspaceTitleFlexDiv>
      <WorkspaceTitleHr flexGrow={2} />
      <Typography style={{ flexGrow: 1 }}>
        {workspaceTitle.length > 29
          ? `${workspaceTitle.slice(0, 30)}...`
          : workspaceTitle}
      </Typography>
      <WorkspaceTitleHr flexGrow={7} />
    </WorkspaceTitleFlexDiv>
  );

  useEffect(() => {
    const getAllProjectWorkspaces = (allProjects: ProjectType[]) => {
      const listOfWorkspaces = allProjects.map(
        (project: ProjectType) => project.workspace
      );

      const filteredWorkspaces = listOfWorkspaces.reduce(
        (acc: ProjectWorkspaceType[], current: ProjectWorkspaceType) => {
          const itemExists = acc.find(
            (item: ProjectWorkspaceType) => item.id === current.id
          );

          return itemExists ? acc : acc.concat([current]);
        },
        []
      );

      setProjectsWorkspaces(filteredWorkspaces);
    };

    const getAllUserProjects = async () => {
      setIsLoadingPropjects(true);
      try {
        const response = await fetch("/api/user-projects", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, user_projects } = result;
          if (!success && msg) {
            setFetchProjectsError(msg);
          }
          if (
            success &&
            user_projects &&
            JSON.stringify(user_projects) !== JSON.stringify(projects)
          ) {
            getAllProjectWorkspaces(user_projects);
            setProjects(user_projects);
          }
        }
        setIsLoadingPropjects(false);
      } catch (err) {
        console.error(err);
        setIsLoadingPropjects(false);
        setFetchProjectsError("Problem fetching your Projects");
      }
    };

    getAllUserProjects();
  }, [projects, isProjectFormOpen]);

  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}`}>
          <div>
            <PageTitlebar title="Projects" toggleForm={onProjectFormToggle} />
            {isLoadingProjects && <LinearProgress />}
            {isProjectFormOpen && (
              <ProjectForm
                isOpen={isProjectFormOpen}
                toggleForm={onProjectFormToggle}
              />
            )}
            <DeleteItemForm
              onDeleteItem={onDeleteProject}
              onToggleForm={toggleDeleteForm}
              isFormOpen={isDeleteFormOpen}
              title="Are you sure you want to DELETE this Project and ALL it's contents?"
            />
            <Pannel>
              <PannelContainer>
                {!isLoadingProjects && fetchProjectsError && (
                  <ErrorMessageDiv>{fetchProjectsError}</ErrorMessageDiv>
                )}
                {!isLoadingProjects &&
                  !fetchProjectsError &&
                  projects.length < 1 && (
                    <div style={{ width: "100%" }}>
                      <Typography variant="h6">
                        You do not have any Workspaces yet
                      </Typography>
                    </div>
                  )}

                {projectsWorkspaces &&
                  projects &&
                  projectsWorkspaces.length > 0 &&
                  projectsWorkspaces.map(
                    (workspace: { id: number; name: string }, idx: number) => {
                      return (
                        <ProjectWorkspace
                          id="project-workspace"
                          key={`${workspace.id}-${idx}-${workspace.name}`}
                        >
                          <ProjectWorkspaceTitle
                            workspaceTitle={workspace.name}
                          />
                          <div>
                            {projects.length > 0 &&
                              projects.map(
                                (project: ProjectType, index: number) =>
                                  project.workspace.name === workspace.name &&
                                  project.workspace.id === workspace.id && (
                                    <div
                                      style={{
                                        display: "inline-block",
                                        float: "left",
                                      }}
                                      key={`${project.id}-${index}-${project.name}`}
                                      onClick={() => {
                                        goToRoute(project.id);
                                      }}
                                    >
                                      <ItemDisplay
                                        type="Project"
                                        itemHeader={project.name}
                                        subItemsList={project.tickets}
                                        goToSubItem={goToRoute}
                                        options={[
                                          {
                                            optionTitle: "Delete Project",
                                            optionFunction: () => {
                                              toggleDeleteForm(project.id);
                                            },
                                          },
                                        ]}
                                      />
                                    </div>
                                  )
                              )}
                          </div>
                        </ProjectWorkspace>
                      );
                    }
                  )}
              </PannelContainer>
            </Pannel>
          </div>
        </Route>
        <Route path={`${match.url}/:projectId`}>
          <Project />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(ProjectsPage);
