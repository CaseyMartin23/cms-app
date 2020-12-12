import React, { useEffect, useState } from "react";

import { addAuthHeaders } from "../../utils";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Dialog from "../../comps/dialog";

import { ErrorMessageDiv, StyledButton } from "../../comps/styledComps";

type WorkspacesFormPropsType = {
  isOpen: boolean;
  toggleForm(): void;
};

const WorkspacesForm: React.FC<WorkspacesFormPropsType> = ({
  isOpen,
  toggleForm,
}) => {
  const [workspaceFormData, setWorkspaceFormData] = useState({ name: "" });
  const [submisssionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | undefined>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const { name, value } = target;

    setSubmissionError(undefined);

    if (name === "name" && value.toString().length < 1) {
      setSubmissionError("Workspace name can't be empty");
    }

    setWorkspaceFormData({ ...workspaceFormData, [name]: value });
  };

  const onFormClose = () => {
    setWorkspaceFormData({ name: "" });
    toggleForm();
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionLoading(true);

    try {
      await fetch("/api/create-workspace", {
        method: "POST",
        headers: addAuthHeaders(),
        body: JSON.stringify({
          ...workspaceFormData,
          name: workspaceFormData.name.toString().trim(),
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setSubmissionLoading(false);
    onFormClose();
  };

  useEffect(() => {
    const workspaceNameInput = document.getElementById("workspace_name");
    if (workspaceNameInput) workspaceNameInput.focus();
  }, []);

  return (
    <div>
      <Dialog isOpen={isOpen}>
        <Container component="main" maxWidth="xs">
          <Typography style={{ padding: "5px" }} component="h1" variant="h5">
            Create Workspace
          </Typography>
          <form
            onSubmit={onFormSubmit}
            style={{ width: "396px" }}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color="primary"
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
                <StyledButton
                  type="submit"
                  style={{ width: "82px", marginRight: "10px" }}
                  variant="contained"
                  color="primary"
                  disabled={submisssionLoading}
                >
                  create
                </StyledButton>
                <StyledButton
                  onClick={onFormClose}
                  style={{ width: "82px" }}
                  variant="contained"
                  color="secondary"
                >
                  close
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default WorkspacesForm;
