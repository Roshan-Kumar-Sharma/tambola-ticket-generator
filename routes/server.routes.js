import express from "express"

import apiv1Router from "../api/v1/apiv1.routes.js"

const Router = express.Router()

Router.use("/api/v1", apiv1Router)

export default Router