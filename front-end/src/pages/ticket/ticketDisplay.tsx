import React from "react";

import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { ItemContainer } from "../../comps/styledComps";

const TicketContainer = styled(ItemContainer)`
  padding: 0;
  border: 0px;
`;

const backgroundColor = "#2e3138";

const TicketTitleDiv = styled.div`
  margin-bottom: 3px;
  height: 50px;
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: #485ed6;
  border: 0px solid;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;
  font-size: 23px;
  font-weight: 400;
`;

const TicketDescrDiv = styled.div`
  margin-bottom: 3px;
  height: 150px;
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: ${backgroundColor};
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
`;

const StyledButton = styled(Button)`
  color: #21c400;
  font-weight: 500;
  border: 2px solid #21c400;
`;

const TicketStateDiv = styled.div`
  height: 50px;
  padding: 6px;
  background-color: ${backgroundColor};
  box-sizing: border-box;
  border: 0px solid;
  border-radius: 0px 0px 4px 4px;
`;

type TicketDisplayProps = {
  ticket: {
    id: number;
    name: string;
    description?: string;
    state: string;
  };
};

const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket }) => {
  return (
    <TicketContainer>
      <TicketTitleDiv>{ticket.name}</TicketTitleDiv>
      <TicketDescrDiv>
        {ticket.description ? ticket.description : "No description"}
      </TicketDescrDiv>
      <TicketStateDiv>
        <StyledButton variant="outlined" style={{ float: "right" }}>
          {ticket.state}
        </StyledButton>
      </TicketStateDiv>
    </TicketContainer>
  );
};

export default TicketDisplay;
