import React from "react";

import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

const WorkspaceTitleFlexDiv = styled.div`
  display: flex;
  padding: 8px;
  color: white;
`;

const WorkspaceTitleHr = styled.hr`
  border: 0;
  height: 0;
  background-color: #3f51b5;
  border-bottom: 1px solid;
  border-top: 1px solid;
  flex-grow: ${(props: WorkspaceTitleHrProps) =>
    props.flexGrow && props.flexGrow};
`;

type WorkspaceTitleHrProps = {
  flexGrow: number;
};

type ProjectWorkspaceTitlePropsType = {
  workspaceTitle: string;
};

const ProjectWorkspaceTitle: React.FC<ProjectWorkspaceTitlePropsType> = ({
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

export default ProjectWorkspaceTitle;
