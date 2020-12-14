import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Dialog from "./dialog";

import { StyledButton } from "./styledComps";

type DeleteItemFormProps = {
  isFormOpen: boolean;
  onDeleteItem: () => Promise<void>;
  onToggleForm: () => void;
  title: string;
};

const DeleteItemForm: React.FC<DeleteItemFormProps> = ({
  isFormOpen,
  onDeleteItem,
  onToggleForm,
  title,
}) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDeleteItem();
  };

  return (
    <Dialog isOpen={isFormOpen}>
      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Typography>{title}</Typography>
          </Grid>
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
            >
              delete
            </StyledButton>
            <StyledButton
              onClick={onToggleForm}
              style={{ width: "82px" }}
              variant="contained"
              color="secondary"
            >
              cancel
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default DeleteItemForm;
