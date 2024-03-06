import { Schema } from "mongoose";

export default interface IParticipant {
    _id?: Schema.Types.ObjectId;
    userId: number,
    eventId: number
}