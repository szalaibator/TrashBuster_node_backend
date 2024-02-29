/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, MinLength } from "class-validator";

import IAddress from "./address.interface";

export default class CreateAddressDto implements IAddress {
    @IsString()
    @MinLength(5)
    public street: string;

    @IsString()
    public city: string;

    @IsString()
    public country: string;
}
