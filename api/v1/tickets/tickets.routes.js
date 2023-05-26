import express from "express";

import * as TicketController from "./tickets.controller.js";

const TicketRouter = express.Router();

TicketRouter.post("/generate_ticket", TicketController.generateTicket);
TicketRouter.get("/get_ticket", TicketController.getTicket);

export default TicketRouter;
