import React, { useEffect, useState } from "react";

import ItemDisplay from "../../comps/itemDisplay";
import EditableHeader from "../../comps/editableHeader";
import {
  PaperBackground,
  Pannel,
  PannelContainer,
  StyledLink,
} from "../../comps/styledComps";

type WorkspaceProjectType = {
  id: number;
  name: string;
  tickets: { id: number; name: string }[];
};

type WorkspaceType = {
  id: number;
  name: string;
  owned_by: string;
  projects: WorkspaceProjectType[];
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

  useEffect(() => {
    console.log("workspace->", workspace);
  }, [workspace]);

  return (
    <PaperBackground>
      {workspace && (
        <EditableHeader title={workspace.name} owned_by={workspace.owned_by} />
      )}
      <Pannel>
        <PannelContainer>
          {workspace &&
            workspace.projects.length > 0 &&
            workspace.projects.map(
              (project: WorkspaceProjectType, index: number) => (
                <StyledLink
                  key={`${project.id}-${index}-${project.name}`}
                  to=""
                >
                  <ItemDisplay
                    itemHeader={project.name}
                    subItemsList={project.tickets}
                  />
                </StyledLink>
              )
            )}
        </PannelContainer>
      </Pannel>
    </PaperBackground>
  );
};

export default Workspace;
