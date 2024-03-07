import "reflect-metadata";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";
import IAssigned from "./assigned.interface";

export default class CreateAssignedDto implements IAssigned {
    @IsMongoId()
    public eventId: Number;

    @IsMongoId()
    public dumpId: Number;
}
