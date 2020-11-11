import React from "react";

import Dialog from "../../comps/dialog";

type WorkspacesFormPropsType = {
  isOpen: boolean;
  onClose(): void;
};

const WorkspacesForm: React.FC<WorkspacesFormPropsType> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div>
      <Dialog
        title="Create Workspace"
        onClose={onClose}
        isOpen={isOpen}
      ></Dialog>
    </div>
  );
};

export default WorkspacesForm;
