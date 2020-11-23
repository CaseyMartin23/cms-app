import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "../../comps/dialog";

import { ErrorMessageDiv } from "../../comps/styledComps";

type WorkspacesFormPropsType = {
  workspaceId?: number;
  isOpen: boolean;
  onClose(): void;
};

type ExistingWorkspaceType = {
  id: number;
  name: string;
  owned_by: string;
  created_at: string;
};

const WorkspacesForm: React.FC<WorkspacesFormPropsType> = ({
  workspaceId,
  isOpen,
  onClose,
}) => {
  const [existingWorkspace, setExistingWorkspace] = useState<
    ExistingWorkspaceType | undefined
  >();
  const [workspaceFormData, setWorkspaceFormData] = useState({
    name: existingWorkspace ? existingWorkspace.name : "",
  });
  const [submisssionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | undefined>();

  useEffect(() => {
    getExistingWorkspace();
  }, [existingWorkspace]);

  const getExistingWorkspace = async () => {
    if (workspaceId) {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`);
        const result = await response.json();

        if (result) {
          if (Array.isArray(result) && result.length > 0) {
            const [workspace] = result;
            setExistingWorkspace(workspace);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const { name, value } = target;

    setSubmissionError(undefined);

    if (name === "name" && value.toString().length < 1) {
      setSubmissionError("Workspace name can't be empty");
    }

    setWorkspaceFormData({ ...workspaceFormData, [name]: value });
  };

  const onCreateWorkspace = async () => {
    try {
      const response = await fetch("/api/create-workspace", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...workspaceFormData,
          name: workspaceFormData.name.toString().trim(),
        }),
      });
      const result = await response;

      console.log("onCreateWorkspace-result->", result);
    } catch (err) {
      console.error(err);
    }
  };

  const onFormClose = () => {
    if (!existingWorkspace) setWorkspaceFormData({ name: "" });
    onClose();
  };

  const onUpdateWorkspace = () => {};

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    if (existingWorkspace) {
      onUpdateWorkspace();
    } else {
      onCreateWorkspace();
    }

    setSubmissionLoading(false);
    onClose();
  };

  return (
    <div>
      <Dialog isOpen={isOpen}>
        <Container component="main" maxWidth="xs">
          <Typography style={{ padding: "5px" }} component="h1" variant="h5">
            {workspaceId ? "Update Workspace" : "Create Workspace"}
          </Typography>
          <form onSubmit={onFormSubmit} style={{ width: "396px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={onChangeHandler}
                  value={workspaceFormData.name}
                  variant="outlined"
                  required
                  fullWidth
                  name="name"
                  label="Workspace Name"
                  type="text"
                  id="workspace_name"
                />
              </Grid>
              {submissionError && (
                <ErrorMessageDiv>{submissionError}</ErrorMessageDiv>
              )}
            </Grid>
            <Grid
              container
              justify="flex-end"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Grid item>
                <Button
                  onClick={onFormClose}
                  style={{ width: "82px", marginRight: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  close
                </Button>
                <Button
                  type="submit"
                  style={{ width: "82px" }}
                  variant="contained"
                  color="primary"
                >
                  {workspaceId ? "save" : "create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default WorkspacesForm;
