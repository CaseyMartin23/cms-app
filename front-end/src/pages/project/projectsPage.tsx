import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";

import { addAuthHeaders } from "../../utils";

import Project from "./project";
import ProjectForm from "./projectForm";

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
};

const ProjectsPage: React.FC = (props: any) => {
  const { match, history } = props;
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isLoadingProjects, setIsLoadingPropjects] = useState(false);
  const [fetchProjectsError, setFetchProjectsError] = useState<
    string | undefined
  >();

  const onProjectFormToggle = () => {
    setIsProjectFormOpen(!isProjectFormOpen);
  };

  const goToRoute = (id: string | number) => {
    history.push(`${match.url}/${id}`);
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
        setFetchProjectsError("Problem fetching your Workspaces");
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
            {!isLoadingProjects && projects.length < 1 && (
              <div>You do not have any Workspaces yet</div>
            )}
            {isProjectFormOpen && (
              <ProjectForm
                isOpen={isProjectFormOpen}
                toggleForm={onProjectFormToggle}
              />
            )}
            <Pannel>
              {fetchProjectsError && (
                <ErrorMessageDiv>{fetchProjectsError}</ErrorMessageDiv>
              )}
              <PannelContainer>
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
                        subItemsList={[]}
                        goToSubItem={goToRoute}
                        options={[
                          { optionTitle: "", optionFunction: () => {} },
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

export default ProjectsPage;
