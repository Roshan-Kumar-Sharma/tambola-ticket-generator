import ENV from "./secret.js";

import { MongoClient } from "mongodb";

const { DB_URI, DB_NAME, DB_COLLECTION } = ENV;

console.log({ DB_URI, DB_NAME, DB_COLLECTION });

const dbConnect = async () => {
    const client = new MongoClient(DB_URI);
    try {
        await client.connect();

        console.log("Connection established successfully.");

        const database = client.db(DB_NAME);
        const collection = database.collection(DB_COLLECTION);

        return collection;
    } catch (err) {
        console.log(err.message);
        client.close();
        process.exit(0);
    }
};

const DB_CONNECTION = await dbConnect();

export default DB_CONNECTION;
