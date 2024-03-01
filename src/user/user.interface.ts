import { Schema } from "mongoose";

export default interface IUser {
    _id?: Schema.Types.ObjectId;
    username: string;
    email: string;
    isVerified: boolean;
    profilePictureURL: string;
    verificationToken: string;
    password: string;
    roles?: string[];
}
