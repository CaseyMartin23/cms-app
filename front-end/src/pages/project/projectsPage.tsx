import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { addAuthHeaders } from "../../utils";

import Project from "./project";
import ProjectForm from "./projectForm";
import ItemParentTitleDisplay from "../../comps/itemParentTitleDisplay";

import DeleteItemForm from "../../comps/deleteItemForm";
import PageTitlebar from "../../comps/pagesTitlebar";
import ItemDisplay from "../../comps/itemDisplay";
import {
  Pannel,
  PannelContainer,
  ErrorMessageDiv,
  ItemParentDiv,
  ItemDiv,
} from "../../comps/styledComps";

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

const ProjectsPage: React.FC<RouteComponentProps> = ({ match, history }) => {
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

  useEffect(() => {
    const getAllProjectWorkspaces = (allProjects: ProjectType[]) => {
      const listOfWorkspaces = allProjects
        .map((project: ProjectType) => project.workspace)
        .reduce(
          (acc: ProjectWorkspaceType[], current: ProjectWorkspaceType) => {
            const itemExists = acc.find(
              (item: ProjectWorkspaceType) => item.id === current.id
            );

            return itemExists ? acc : acc.concat([current]);
          },
          []
        );

      setProjectsWorkspaces(
        listOfWorkspaces.sort((currWorkspace, prevWorkspace) => {
          const currWorkspaceName = currWorkspace.name.toLowerCase();
          const prevWorkspaceName = prevWorkspace.name.toLowerCase();

          if (currWorkspaceName < prevWorkspaceName) return -1;
          if (currWorkspaceName > prevWorkspaceName) return 1;
          return 0;
        })
      );
    };

    const getAllUserProjects = async () => {
      setIsLoadingPropjects(true);
      try {
        const response = await fetch("/api/user-projects", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, userProjects } = result;
          if (
            success &&
            userProjects &&
            JSON.stringify(userProjects) !== JSON.stringify(projects)
          ) {
            getAllProjectWorkspaces(userProjects);
            setProjects(userProjects);
          }
          if (!success && msg) {
            setFetchProjectsError(msg);
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
                      You do not have any Projects yet
                    </Typography>
                  </div>
                )}

              {projectsWorkspaces &&
                projectsWorkspaces.length > 0 &&
                projectsWorkspaces.map(
                  (workspace: { id: number; name: string }, idx: number) => (
                    <ItemParentDiv
                      key={`${workspace.id}-${idx}-${workspace.name}`}
                    >
                      <ItemParentTitleDisplay
                        itemParentTitle={workspace.name}
                      />
                      <div>
                        {projects &&
                          projects.length > 0 &&
                          projects.map(
                            (project: ProjectType, index: number) =>
                              project.workspace.name === workspace.name &&
                              project.workspace.id === workspace.id && (
                                <ItemDiv
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
                                </ItemDiv>
                              )
                          )}
                      </div>
                    </ItemParentDiv>
                  )
                )}
            </PannelContainer>
          </Pannel>
        </div>
      </Route>
      <Route path={`${match.url}/:projectId`}>
        <Project reloadProjects={reloadProjects} />
      </Route>
    </Switch>
  );
};

export default withRouter(ProjectsPage);
