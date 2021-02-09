import React from "react";

import styled from "styled-components";

import { ItemContainer } from "../../comps/styledComps";

const TicketContainer = styled(ItemContainer)`
  padding: 0;
`;

const TicketTitleDiv = styled.div`
  height: 60px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-size: 23px;
  font-weight: 400;
  border-bottom: solid white 1px;
`;

const TicketDescrDiv = styled.div`
  height: 90px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 400;
  border-bottom: solid white 1px;
`;

const TicketStateDiv = styled.div`
  height: 50px;
  padding: 15px;
  box-sizing: border-box;
  /* float: right; */
`;

type TicketDisplayProps = {
  ticket: { id: number; name: string; description?: string; state: string };
};

const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket }) => {
  return (
    <TicketContainer>
      <TicketTitleDiv>{ticket.name}</TicketTitleDiv>
      <TicketDescrDiv>
        {ticket.description ? ticket.description : "No description"}
      </TicketDescrDiv>
      <TicketStateDiv>
        <button style={{ float: "right" }}>{ticket.state}</button>
      </TicketStateDiv>
    </TicketContainer>
  );
};

export default TicketDisplay;
