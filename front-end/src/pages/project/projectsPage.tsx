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

import DeleteItemForm from "../../comps/deleteItemForm";
import PageTitlebar from "../../comps/pagesTitlebar";
import ItemDisplay from "../../comps/itemDisplay";
import {
  Pannel,
  PannelContainer,
  ErrorMessageDiv,
} from "../../comps/styledComps";

type ProjectType = {
  id: number;
  name: string;
  tickets: { id: number; name: string }[];
};

interface ProjectsPagePropsType extends RouteComponentProps {}

const ProjectsPage: React.FC<ProjectsPagePropsType> = ({ match, history }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
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
            projects &&
            JSON.stringify(user_projects) !== JSON.stringify(projects)
          ) {
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
                {projects &&
                  projects.length > 0 &&
                  projects.map((project: ProjectType, index: number) => (
                    <div
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
                  ))}
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
