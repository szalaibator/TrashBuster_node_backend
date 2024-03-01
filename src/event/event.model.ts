import { model, Schema } from "mongoose";

import IEvent from "./event.interface";

const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        participants: {
            type: String,
            required: true
        },
        creatorId: {
            type: Number,
            required: true
        }

    }
)

const eventModel = model<IEvent>("Event", eventSchema, "events");

export default eventModel;
