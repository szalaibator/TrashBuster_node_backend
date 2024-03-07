import { Schema } from "mongoose";

export default interface IAssigned {
    _id?: Schema.Types.ObjectId;
    eventId: Number,
    dumpId: Number
}