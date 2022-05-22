import mongoose from "mongoose";
import { DATABASE } from "../details.json";

const { URL, PORT, NAME, OPTIONS } = DATABASE;

mongoose.connect(`mongodb://${URL}:${PORT}/${NAME}`, OPTIONS)
    .then(() => console.log(`MongoDB connected to database - ${NAME}`))
    .catch((err: any) => console.log("Error while connectiong to database ---", err));
