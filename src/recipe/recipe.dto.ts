import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Schema } from "mongoose";

import IRecipe from "./recipe.interface";

export default class CreateRecipeDto implements IRecipe {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    public recipeName: string;

    @IsNotEmpty()
    @IsUrl()
    @IsString()
    public imageURL: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsArray()
    @ArrayNotEmpty()
    public ingredients: string[];
}
