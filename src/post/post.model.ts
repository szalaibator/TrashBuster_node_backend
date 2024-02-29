import { model, Schema } from "mongoose";

import IPost from "./post.interface";

const postSchema = new Schema<IPost>(
    {
        // _id: Schema.Types.ObjectId,
        // user_id: {
        //     ref: "User",
        //     type: Schema.Types.ObjectId,
        // },
        content: String,
        title: {
            type: String,
            required: true,
            maxlength: 50,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

postSchema.virtual("author", {
    ref: "User",
    localField: "user_id",
    foreignField: "_id",
    justOne: true,
});

const postModel = model<IPost>("Post", postSchema, "posts");

export default postModel;
