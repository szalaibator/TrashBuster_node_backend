import { model, Schema } from "mongoose";

import IAssigned from "./assigned.interface";

const assignedSchema = new Schema<IAssigned>({
    eventId: {
        type: Number,
        required: true,
    },
    dumpId: {
        type: Number,
        required: true,
    },
});
const assignedModel = model<IAssigned>("Assigned", assignedSchema, "assigneds");

export default assignedModel;
