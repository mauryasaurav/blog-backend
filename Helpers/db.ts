import mongoose from "mongoose";
import { DATABASE } from "../details.json";

const { NAME } = DATABASE;

mongoose.connect(`mongodb+srv://travelers:travelers@travlers.rgwalfg.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log(`MongoDB connected to database - ${NAME}`))
    .catch((err: any) => console.log("Error while connectiong to database ---", err));
