import "reflect-metadata";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";
import IDump from "./dump.interface";

export default class CreateDumpDto implements IDump {
    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsString()
    public location: string;

    @IsString()
    public contactPhone: string;

    @IsString()
    public contactEmail: string;
}
