import "reflect-metadata";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";
import IParticipant from "./participant.interface";

export default class CreateParticipantDto implements IParticipant {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public userId: number;

    @IsMongoId()
    public eventId: number;
}
