import React, { useEffect, useState } from "react";

import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import { addAuthHeaders, arrayOfObjectsAreEqual } from "../../utils";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import PageTitlebar from "../../comps/pagesTitlebar";
import ItemParentTitleDisplay from "../../comps/itemParentTitleDisplay";

import TicketForm from "./ticketForm";
import TicketDisplay from "./ticketDisplay";
import Ticket from "./ticket";

import {
  Pannel,
  PannelContainer,
  ErrorMessageDiv,
  ItemParentDiv,
  ItemDiv,
} from "../../comps/styledComps";

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

type TicketProjectType = {
  id: number;
  name: string;
};

const TicketsPage: React.FC<RouteComponentProps> = ({ match, history }) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticketProjects, setTicketProjects] = useState<TicketProjectType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorFetchingTickets, setErrorFetchingTickets] = useState<
    string | Error
  >("");

  useEffect(() => {
    const getTicketProjects = (allTickets: TicketType[]) => {
      const listOfProjects = allTickets
        .map((ticket) => ticket.project)
        .reduce((accu: TicketProjectType[], current: TicketProjectType) => {
          const itemExists = accu.find(
            (item: TicketProjectType) => item.id === current.id
          );

          return itemExists ? accu : accu.concat([current]);
        }, []);

      setTicketProjects(
        listOfProjects.sort((currentProject, prevProject) => {
          const currentProjectName = currentProject.name.toLowerCase();
          const prevProjectName = prevProject.name.toLowerCase();

          if (currentProjectName < prevProjectName) return -1;
          if (currentProjectName > prevProjectName) return 1;
          return 0;
        })
      );
    };

    const getAllTickets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user-tickets", {
          headers: addAuthHeaders(),
        });
        const result = await response.json();

        if (result) {
          const { success, user_tickets, msg } = result;

          if (
            success &&
            user_tickets &&
            !arrayOfObjectsAreEqual(user_tickets, tickets)
          ) {
            getTicketProjects(user_tickets);
            setTickets(user_tickets);
          }

          if (!success && msg) {
            setErrorFetchingTickets(msg);
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getAllTickets();
  }, [tickets]);

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <div>
          <PageTitlebar title="Tickets" toggleForm={() => {}} />
          <TicketForm isOpen={false} />
          {isLoading && <LinearProgress />}
          <Pannel>
            <PannelContainer>
              {!tickets && !isLoading && errorFetchingTickets && (
                <ErrorMessageDiv>{errorFetchingTickets}</ErrorMessageDiv>
              )}
              {!isLoading && !errorFetchingTickets && tickets.length < 1 && (
                <div style={{ width: "100%" }}>
                  <Typography variant="h6">
                    You do not have any Tickets yet
                  </Typography>
                </div>
              )}

              {ticketProjects &&
                ticketProjects.length > 0 &&
                ticketProjects.map(
                  (project: TicketProjectType, index: number) => (
                    <ItemParentDiv
                      key={`${project.id}-${index}-${project.name}`}
                    >
                      <ItemParentTitleDisplay itemParentTitle={project.name} />
                      {tickets &&
                        tickets.map(
                          (ticket: TicketType, index: number) =>
                            ticket.project.id === project.id &&
                            ticket.project.name === project.name && (
                              <ItemDiv
                                key={`${ticket.id}-${index}-${ticket.name}`}
                              >
                                <TicketDisplay ticket={ticket} />
                              </ItemDiv>
                            )
                        )}
                    </ItemParentDiv>
                  )
                )}
            </PannelContainer>
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
