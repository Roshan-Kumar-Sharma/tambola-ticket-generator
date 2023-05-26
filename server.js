import express from "express";

import Router from "./routes/server.routes.js";
import DB_CONNECTION from "./config/db.config.js";
import ENV from "./config/secret.js";

const app = express();

app.use(Router);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
});
