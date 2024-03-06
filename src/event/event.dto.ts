import "reflect-metadata";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested, isString, IsDate } from "class-validator";
import { Schema } from "mongoose";
import IEvent from "./event.interface";

export default class CreateEventDto implements IEvent {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsDate()
    public date: Date;

    @IsString()
    public location: string;

    @IsString()
    public place: string;

    @IsString()
    public participants: string;

    @IsMongoId()
    public creatorId: number;
}