/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IAuthor from "./author.interface";

export default class CreateAuthorDto implements IAuthor {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public user_id: Schema.Types.ObjectId;

    @IsMongoId()
    public post_id: Schema.Types.ObjectId;
}
