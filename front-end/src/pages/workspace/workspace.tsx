import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { PaperBackground } from "../../comps/styledComps";

type WorkspaceType = {
  id: number;
  name: string;
  projects: { id: number; name: string }[];
};

const Workspace = (props: any) => {
  const [workspace, setWorkspace] = useState<WorkspaceType>();
  const { match } = props;
  const workspaceId = match.params.workspaceId;

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`);
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

  return (
    <PaperBackground>
      <div>
        {workspace && <Typography variant="h5">{workspace.name}</Typography>}
      </div>
    </PaperBackground>
  );
};

export default Workspace;
