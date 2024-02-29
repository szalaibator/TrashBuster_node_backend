import { model, Schema } from "mongoose";

import IAuthor from "./author.interface";

const authorSchema = new Schema<IAuthor>(
    {
        // _id: Schema.Types.ObjectId,
        user_id: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        post_id: {
            ref: "Post",
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// authorSchema.virtual("user", {
//     ref: "User",
//     localField: "user_id",
//     foreignField: "_id",
//     justOne: true,
// });

// authorSchema.virtual("post", {
//     ref: "Post",
//     localField: "post_id",
//     foreignField: "_id",
//     justOne: true,
// });

const authorModel = model<IAuthor>("Author", authorSchema, "authors");

export default authorModel;
