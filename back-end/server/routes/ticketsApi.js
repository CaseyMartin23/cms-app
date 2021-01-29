const express = require("express");
const queryTicket = require("../../db/queries/tickets");
const router = express.Router();

router.post("/create-ticket", async (req, res) => {
  try {
    console.log(req.body);
    // const createdTicket = await queryTicket.createTicket({
    //   ...req.body,
    //   owned_by: req.user.id,
    // });
    // res.status(200).json(createdTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-ticket", async (req, res) => {
  try {
    console.log(req.body);
    //   const updatedTicket = await queryTicket.updateTicket({ ...req.body });
    //   res.status(200).json(updatedTicket)
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.delete("/delete-ticket", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.get("/get-user-tickets", async (req, res) => {
  try {
    const userTicket = queryTicket.getTicketsByUserId(req.user.id);
    console.log(userTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
