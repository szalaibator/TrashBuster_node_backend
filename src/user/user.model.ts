import { model, Schema } from "mongoose";

import IUser from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        // _id: Schema.Types.ObjectId,
        email: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profilePictureURL: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String], // Array of string
            required: true,
        },
        verificationToken: {
            type: String,
            required: true
        }
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// userSchema.virtual("recipes", {
//     ref: "Recipe",
//     localField: "_id",
//     foreignField: "user_id", // ref_Field
//     justOne: false,
// });

// userSchema.virtual("author", {
//     ref: "Author",
//     localField: "_id",
//     foreignField: "user_id", // ref_Field
//     justOne: false,
// });

const userModel = model<IUser>("User", userSchema, "users");

export default userModel;
