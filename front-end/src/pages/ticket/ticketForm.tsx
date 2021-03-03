import React, { useState } from "react";

import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "../../comps/dialog";
import {
  ErrorMessageDiv,
  StyledForm,
  StyledButton,
} from "../../comps/styledComps";

const StyledTextArea = styled(TextareaAutosize)`
  width: 94%;
  outline: none;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 10px;
  color: #fff;
  background-color: inherit;

  ::placeholder {
    color: #fff;
  }
`;

type TicketFormProps = {
  isOpen: boolean;
  toggleForm(): void;
};

const TicketForm: React.FC<TicketFormProps> = ({ isOpen, toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    project: 0,
    ticket_repo: "",
  });

  return (
    <Dialog isOpen={isOpen}>
      <Container component="main" maxWidth="xs">
        <Typography style={{ padding: "5px" }} component="h1" variant="h5">
          Create Ticket
        </Typography>
        <StyledForm onSubmit={() => {}} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={() => {}}
                value={formData.name}
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Ticket Name"
                type="text"
                id="ticket_name"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextArea
                color="primary"
                onChange={() => {}}
                // value={formData.description}
                rowsMin={8}
                rowsMax={8}
                name="description"
                placeholder="Ticket Description (Optional)"
                id="ticket_description"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="select-outlined-label">Project</InputLabel>
                <Select
                  style={{ textAlign: "left" }}
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={formData.project}
                  onChange={() => {}}
                  name="project"
                  label="project"
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
                name="ticket_repo"
                label="Ticket repository (Optional)"
                type="text"
                id="ticket_repo"
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
                onClick={toggleForm}
                style={{ width: "82px" }}
                variant="contained"
                color="secondary"
              >
                close
              </StyledButton>
            </Grid>
          </Grid>
        </StyledForm>
      </Container>
    </Dialog>
  );
};

export default TicketForm;
