/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IPost from "./post.interface";

export default class CreatePostDto implements IPost {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    // @IsMongoId()
    // @IsOptional()
    // public user_id: Schema.Types.ObjectId;

    @IsString()
    public content: string;

    @IsString()
    public title: string;
}
