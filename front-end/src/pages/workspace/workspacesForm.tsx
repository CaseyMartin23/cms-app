import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "../../comps/dialog";

type WorkspacesFormPropsType = {
  isOpen: boolean;
  onClose(): void;
};

const WorkspacesForm: React.FC<WorkspacesFormPropsType> = ({
  isOpen,
  onClose,
}) => {
  const onCreateWorkspaceSubmit = () => {};

  return (
    <div>
      <Dialog isOpen={isOpen}>
        <Container component="main" maxWidth="xs">
          <Typography style={{ padding: "5px" }} component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={() => {}} style={{ width: "396px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={() => {}}
                  value=""
                  variant="outlined"
                  required
                  fullWidth
                  name="workspace_name"
                  label="Workspace Name"
                  type="text"
                  id="workspace_name"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-end"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Grid item>
                <Button
                  onClick={onClose}
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
                  add
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
