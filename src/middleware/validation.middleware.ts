// import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import express from "express";

import HttpException from "../exceptions/HttpException";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export default function validationMiddleware(type: any, skipMissingProp = false): express.RequestHandler {
    return (req, res, next) => {
        // forbidUnknownValues: false
        const validatorObject = Object.assign(new type(), req.body);
        validate(validatorObject, { skipMissingProperties: skipMissingProp }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                // Break down, if validate nested object in latest version of class-validator
                // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
                let message = "";
                if (errors[0].constraints) {
                    message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
                } else {
                    message = "Error on check DTO-s ";
                    message += errors.map((error: ValidationError) => Object.values(error.children[0].constraints)).join(", ");
                    // message: " an unknown value was passed to the validate function"
                }
                next(new HttpException(400, message));
            } else {
                next();
            }
        });
    };
}

// Links:
// class-transformer: https://www.jsdocs.io/package/class-transformer#plainToInstance
// class-validator: https://github.com/typestack/class-validator
