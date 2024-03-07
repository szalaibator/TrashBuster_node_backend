import { Schema } from "mongoose";

export default interface IDump {
    _id?: Schema.Types.ObjectId;
    name: string;
    description: string;
    location: string;
    contactPhone: string;
    contactEmail: string;
}
