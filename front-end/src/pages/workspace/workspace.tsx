import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

type WorkspaceType = {
  id: number;
  name: string;
  projects: { id: number; name: string }[];
};

const Workspace = (props: any) => {
  const [workspace, setWorkspace] = useState<WorkspaceType>();
  const { match } = props;

  useEffect(() => {
    getWorkspace();
  }, [workspace]);

  const getWorkspace = async () => {
    try {
      const response = await fetch(
        `/api/workspace/${match.params.workspaceId}`
      );
      const result = await response.json();

      if (result) {
        setWorkspace(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {workspace && <Typography variant="h5">{workspace.name}</Typography>}
    </div>
  );
};

export default Workspace;
