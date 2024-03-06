import { model, Schema } from "mongoose";

import IParticipant from "./participant.interface";

const participantSchema = new Schema<IParticipant>(
    {
        userId: {
            type: Number,
            required: true
        },
        eventId: {
            type: Number,
            required: true
        }
    }
);

const participantModel = model<IParticipant>("Participant", participantSchema, "participants");

export default participantModel;