import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

type PageTitlebarProps = {
  title: string;
  toggleForm(): void;
};

const PageTitlebar: React.FC<PageTitlebarProps> = ({ title, toggleForm }) => {
  const removePluralOfTitle = (pageTitle: string) => {
    const newTitle = pageTitle.split("");
    newTitle.pop();
    return newTitle.join("");
  };

  return (
    <Toolbar style={{ backgroundColor: "#464646", height: "70px" }}>
      <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h4">
        {title}
      </Typography>
      <Button
        onClick={toggleForm}
        style={{ backgroundColor: "#3f51b5" }}
        color="inherit"
      >
        Create {removePluralOfTitle(title)}
      </Button>
    </Toolbar>
  );
};

export default PageTitlebar;
