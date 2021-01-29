import React, { useState } from "react";

import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import PageTitlebar from "../../comps/pagesTitlebar";
import TicketForm from "./ticketForm";
import Ticket from "./ticket";

import { Pannel, PannelContainer } from "../../comps/styledComps";

type TicketType = {
  id: number;
  name: string;
  description: string;
  state: string;
  project: {
    id: number;
    name: string;
  };
};

const TicketsPage: React.FC<RouteComponentProps> = ({ match, history }) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div>
          <PageTitlebar title="Tickets" toggleForm={() => {}} />
          <TicketForm isOpen={false} />
          <Pannel>
            <PannelContainer>{}</PannelContainer>
          </Pannel>
        </div>
      </Route>
      <Route path={`${match.path}/:ticketId`}>
        <Ticket />
      </Route>
    </Switch>
  );
};

export default withRouter(TicketsPage);
