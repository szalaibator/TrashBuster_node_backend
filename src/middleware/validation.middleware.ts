import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import express from "express";

import HttpException from "../exceptions/HttpException";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export default function validationMiddleware(type: any, skipMissingProp = false): express.RequestHandler {
    return (req, res, next) => {
        // forbidUnknownValues: false
        // const validatorObject = Object.assign(new type(), req.body);
        validate(plainToInstance(type, req.body), { skipMissingProperties: skipMissingProp }).then((errors: ValidationError[]) => {
            if (errors!.length > 0) {
                // Break down, if validate nested object in latest version of class-validator
                // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
                let message = "DTO error:";
                for (let i = 0; i < errors.length; i++) {
                    if (errors[i].constraints) {
                        message += `${Object.values(errors[i].constraints)}, `;
                    }
                    if (errors[i].children!.length > 0) {
                        for (let j = 0; j < errors[i].children.length; j++) {
                            if (errors[i].children[j].constraints) {
                                message += `${errors[i].property}.${Object.values(errors[i].children[j].constraints)}, `;
                            }
                        }
                    }
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