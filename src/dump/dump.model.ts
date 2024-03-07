import { model, Schema } from "mongoose";

import IDump from "./dump.interface";

const dumpSchema = new Schema<IDump>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
});
const dumpModel = model<IDump>("Dump", dumpSchema, "dumps");

export default dumpModel;
