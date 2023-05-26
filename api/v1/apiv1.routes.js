import express from "express"

import TicketRouter from "./tickets/tickets.routes.js"

const apiv1Router = express.Router()

apiv1Router.use("/ticket", TicketRouter)

export default apiv1Router