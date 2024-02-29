import { Schema } from "mongoose";
export default interface IPost {
    _id?: Schema.Types.ObjectId;
    // user_id: Schema.Types.ObjectId;
    content: string;
    title: string;
}
