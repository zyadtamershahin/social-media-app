import { env } from "../config/env.service";
import mongoose from "mongoose";

export const database_connection = async () => {
    if (!env.database_uri) {
        throw new Error("Database URI is missing!");
    }

    await mongoose.connect(env.database_uri).then(() => {
        console.log("DB connected");
    });
};