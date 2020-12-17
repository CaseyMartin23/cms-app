import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchProjectError, setFetchProjectError] = useState<
    string | undefined
  >();

  useEffect(() => {
    const getProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/project/${projectId}`);
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
  }, [projectId, setProject, setIsLoading, setFetchProjectError ]);

  return <div></div>;
};

export default Project;
