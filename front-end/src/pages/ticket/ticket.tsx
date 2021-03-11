import React from "react";

import { useParams } from "react-router-dom";

const Ticket = () => {
  const { ticketId } = useParams<{ ticketId: string }>();

  return <div></div>;
};

export default Ticket;
