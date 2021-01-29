import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "../../comps/dialog";

import { ErrorMessageDiv, StyledButton } from "../../comps/styledComps";

type TicketFormProps = {
  isOpen: boolean;
};

const TicketForm: React.FC<TicketFormProps> = ({ isOpen }) => {
  return (
    <Dialog isOpen={isOpen}>
      <Container component="main" maxWidth="xs">
        <Typography style={{ padding: "5px" }} component="h1" variant="h5">
          Create Project
        </Typography>
        <form onSubmit={() => {}} style={{ width: "396px" }} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={() => {}}
                value=""
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
                  value=""
                  onChange={() => {}}
                  name="workspace"
                  label="Workspace"
                >
                  <MenuItem key="" value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={() => {}}
                value=""
                variant="outlined"
                fullWidth
                name="project_repo"
                label="Project repository (Optional)"
                type="text"
                id="project_repo"
              />
            </Grid>
            <ErrorMessageDiv></ErrorMessageDiv>
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
                disabled={false}
              >
                create
              </StyledButton>
              <StyledButton
                onClick={() => {}}
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

export default TicketForm;
