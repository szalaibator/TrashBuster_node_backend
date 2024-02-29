import { Schema } from "mongoose";

import IAddress from "./address.interface";

export default interface IUser {
    _id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    email_verified: boolean;
    auto_login: boolean;
    picture: string;
    password: string;
    roles?: string[];
    address?: IAddress;
}
