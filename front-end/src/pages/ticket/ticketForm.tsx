import React, { useState, useEffect } from "react";

import { addAuthHeaders } from "../../utils";

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
  border: 1px solid #000;
  border-radius: 4px;
  padding: 10px;
  color: #fff;
  background-color: inherit;
  resize: none;

  ::placeholder {
    color: #fff;
  }

  :focus {
    border-width: 2px;
    border-color: #3f51b5;
  }
`;

type TicketFormProps = {
  isOpen: boolean;
  toggleForm(): void;
};

type ProjectType = {
  id: number;
  name: string;
};

const TicketForm: React.FC<TicketFormProps> = ({ isOpen, toggleForm }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [submissionError, setSubmissionError] = useState<string | Error>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    project: "",
    ticket_repo: "",
  });

  const onFormClose = () => {
    setFormData({ name: "", description: "", project: "", ticket_repo: "" });
    toggleForm();
  };

  const onFormChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { value: unknown; name?: string }
    >
  ) => {
    setSubmissionError(undefined);

    const name = event.target.name ? event.target.name : "";
    const value = event.target.value ? event.target.value : "";

    if (name === "name" && typeof value === "string" && value.length < 1) {
      setSubmissionError("Ticket Name can not be empty");
    }

    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/create-ticket", {
        method: "POST",
        headers: addAuthHeaders(),
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
    onFormClose();
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("/api/user-projects", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, msg, userProjects } = result;

          if (success && userProjects && Array.isArray(userProjects)) {
            setProjects(
              userProjects.map((project) => ({
                id: project.id,
                name: project.name,
              }))
            );
          }

          if (!success && msg) {
            setSubmissionError(msg);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  }, []);

  return (
    <Dialog isOpen={isOpen}>
      <Container component="main" maxWidth="xs">
        <Typography style={{ padding: "5px" }} component="h1" variant="h5">
          Create Ticket
        </Typography>
        <StyledForm onSubmit={onFormSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={onFormChange}
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
                onChange={onFormChange}
                value={formData.description}
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
                  onChange={onFormChange}
                  name="project"
                  label="project"
                >
                  {projects.length > 0 &&
                    projects.map((project: ProjectType, index: number) => (
                      <MenuItem
                        key={`${project.id}-${index}-${project.name}`}
                        value={project.id}
                      >
                        {project.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="primary"
                onChange={onFormChange}
                value={formData.ticket_repo}
                variant="outlined"
                fullWidth
                name="ticket_repo"
                label="Ticket repository (Optional)"
                type="text"
                id="ticket_repo"
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
        </StyledForm>
      </Container>
    </Dialog>
  );
};

export default TicketForm;
