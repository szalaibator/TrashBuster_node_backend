import "reflect-metadata";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Schema } from "mongoose";
import IUser from "./user.interface";

export default class CreateUserDto implements IUser {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsString()
    public username: string;

    @IsString()
    public verificationToken: string;

    @IsEmail()
    public email: string;

    // Example - compare two fields in document:
    // @IsEmail()
    // @Match("email", { message: "email and email_address_confirm don't match." })
    // public email_address_confirm: string;

    @IsBoolean()
    public isVerified: boolean;

    @IsString()
    public profilePictureURL: string;

    @IsString()
    public password: string;

    // roles set ["user"] in handler registration
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public roles: string[];
}
