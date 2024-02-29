import { Schema } from "mongoose";

export default interface IAuthor {
    _id?: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    post_id: Schema.Types.ObjectId;
}
