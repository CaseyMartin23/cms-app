import React, { useEffect, useState } from "react";

import { addAuthHeaders } from "../../utils";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "../../comps/dialog";
import { ErrorMessageDiv, StyledButton } from "../../comps/styledComps";

type ProjectFormPropsType = {
  isOpen: boolean;
  toggleForm: () => void;
};

type WorkspacesType = {
  id: number;
  name: string;
};

const ProjectForm: React.FC<ProjectFormPropsType> = ({
  isOpen,
  toggleForm,
}) => {
  const [workspaces, setWorkspaces] = useState<WorkspacesType[]>([]);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    workspace: "",
    project_repo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const onFormValuesChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { value: unknown; name?: string }
    >
  ) => {
    const name = event.target.name ? event.target.name : "";
    const value = event.target.value ? event.target.value : "";

    setSubmitError(undefined);

    if (name === "name" && typeof value === "string" && value.length < 1) {
      setSubmitError("Project name can't be empty");
    }
    setProjectFormData({ ...projectFormData, [name]: value });
  };

  const onFormClose = () => {
    setProjectFormData({ name: "", workspace: "", project_repo: "" });
    toggleForm();
  };
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-project", {
        method: "POST",
        headers: addAuthHeaders(),
        body: JSON.stringify({
          ...projectFormData,
          name: projectFormData.name.toString().trim(),
        }),
      });
      const result = await response.json();

      if (result) {
        const { success, msg } = result;
        if (!success && msg) {
          setSubmitError(msg);
        }
      }
    } catch (err) {
      console.error(err);
      setSubmitError(err.message);
    }
    setIsLoading(false);
    onFormClose();
  };

  useEffect(() => {
    const getUserWorkspaces = async () => {
      try {
        const response = await fetch("/api/users-workspaces-ids-names", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, user_workspaces } = result;
          if (
            success &&
            user_workspaces &&
            JSON.stringify(user_workspaces) !== JSON.stringify(workspaces)
          ) {
            setWorkspaces(user_workspaces);
          }
          if (!success && msg) {
            setSubmitError(msg);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserWorkspaces();
  }, [workspaces]);

  return (
    <Dialog isOpen={isOpen}>
      <Container component="main" maxWidth="xs">
        <Typography style={{ padding: "5px" }} component="h1" variant="h5">
          Create Project
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
                onChange={onFormValuesChange}
                value={projectFormData.name}
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Project Name"
                type="text"
                id="project_name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="select-outlined-label">Workspace</InputLabel>
                <Select
                  style={{ textAlign: "left" }}
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={projectFormData.workspace}
                  onChange={onFormValuesChange}
                  name="workspace"
                  label="Workspace"
                >
                  {workspaces.length > 0 &&
                    workspaces.map(
                      (workspace: WorkspacesType, index: number) => (
                        <MenuItem
                          key={`${workspace.id}-${index}-${workspace.name}`}
                          value={workspace.id}
                        >
                          {workspace.name}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={onFormValuesChange}
                value={projectFormData.project_repo}
                variant="outlined"
                fullWidth
                name="project_repo"
                label="Project repository (Optional)"
                type="text"
                id="project_repo"
              />
            </Grid>
            {submitError && <ErrorMessageDiv>{submitError}</ErrorMessageDiv>}
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
                disabled={isLoading}
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
  );
};

export default ProjectForm;
