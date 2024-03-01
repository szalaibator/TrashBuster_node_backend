import { Schema } from "mongoose";

export default interface IEvent {
    _id?: Schema.Types.ObjectId;
    title: string;
    description: string;
    date: Date;
    location: string;
    place: string;
    participants: string;
    creatorId: number;
}