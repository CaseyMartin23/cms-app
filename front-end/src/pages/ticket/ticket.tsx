import React from "react";

import { useParams } from "react-router-dom";

import {
  Pannel,
  PannelContainer,
  PaperBackground,
} from "../../comps/styledComps";

import DeleteItemForm from "../../comps/deleteItemForm";
import EditableHeader from "../../comps/editableHeader";

const Ticket = () => {
  const { ticketId } = useParams<{ ticketId: string }>();

  return (
    <PaperBackground>
      <DeleteItemForm
        isFormOpen={false}
        onToggleForm={() => {}}
        onDeleteItem={async () => {}}
        title=""
      />

      <Pannel>
        <PannelContainer></PannelContainer>
      </Pannel>
    </PaperBackground>
  );
};

export default Ticket;
