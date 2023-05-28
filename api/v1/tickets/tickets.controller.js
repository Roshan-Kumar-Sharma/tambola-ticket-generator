import * as Helper from "../../../utils/helper.js";
import * as TicketGenerator from "../../../utils/tambola_ticket_generator.js";
import DB_CONNECTION from "../../../config/db.config.js";

import { v4 as uuidv4 } from "uuid";
import CreateError from "http-errors";

const generateTicket = async (req, res) => {
    try {
        console.log("generate");
        let { n, id } = req.query;
        let totalTicket = parseInt(n);

        if (isNaN(totalTicket))
            throw CreateError.BadRequest("Invalid total number of ticket");

        if (!id) id = uuidv4();
        else {
            let isIdExists = await DB_CONNECTION.findOne({ id });
            if (!isIdExists) id = uuidv4();
        }

        // let tambolaTicketSet = Helper.generateTicketSet(totalTicket);
        let tambolaTicketSet = TicketGenerator.generateTicketSet(totalTicket);

        let db_obj = { id, tickets: tambolaTicketSet };

        let insertAck = await DB_CONNECTION.insertOne(db_obj);
        if (!insertAck.acknowledged)
            throw CreateError.InternalServerError(
                "Internal Server Error. Please try again."
            );

        console.log("Created Tickets.");

        return res.status(200).send({
            status: true,
            id,
            message:
                "Ticket generated successfully. Use the given id to get the ticket.",
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: false,
            message: err.message || "Ticket generation failed.",
            data: [],
        });
    }
};

const getTicket = async (req, res) => {
    try {
        let { id, offset, limit } = req.query;

        offset = parseInt(offset);
        limit = parseInt(limit);

        if (isNaN(offset) || isNaN(limit))
            throw CreateError.BadRequest("Invalid value for offset or limit");
        if (!id) throw CreateError.BadRequest("No id found to get the ticket.");

        let filter = { id };

        let idTickets = await DB_CONNECTION.find(filter).toArray();

        // console.log(idTickets);

        if (!idTickets.length)
            throw CreateError.NotFound("No ticket for this id found.");

        let tickets = [];
        idTickets.forEach((ticketSet) => {
            // console.log(ticketSet.tickets);
            tickets = tickets.concat(ticketSet.tickets);
        });

        let total = tickets.length;
        tickets = tickets.slice(offset, offset + limit);

        console.log("Fetched Tickets.");

        return res.status(200).send({
            status: true,
            total,
            offset,
            limit,
            tickets,
            message: "All ticket for the given id is fetched.",
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: false,
            message: err.message || "Ticket generation failed.",
            data: [],
        });
    }
};

export { generateTicket, getTicket };
