import { MongoClient } from "mongodb";
import { DEV_DB_URL } from "./constants.js";

const MONGO_CLIENT_ENDPOINT = process.env.DEV_DB_URL ?? DEV_DB_URL
const mongoClient = new MongoClient(MONGO_CLIENT_ENDPOINT);
export {
    mongoClient
}