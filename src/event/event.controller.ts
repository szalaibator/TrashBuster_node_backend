import { NextFunction, Request, Response, Router } from "express";
import ISession from "interfaces/session.interface";
import { Types } from "mongoose";

import authorModel from "../sample_author/author.model";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import IController from "../interfaces/controller.interface";
import IEvent from "./event.interface";
import CreateEventDto from "./event.dto";
import eventModel from "./event.model";
import authMiddleware from "middleware/auth.middleware";

export default class EventController implements IController {
    public path: "/";
    public router = Router();
    private event = eventModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}events/creator/{creatorId}`, authMiddleware,);
        this.router.get(`${this.path}event/most-participants`, authMiddleware,);
        this.router.get(`${this.path}event/latest`, authMiddleware,);
        this.router.get(`${this.path}event/closest`, authMiddleware,);
    }
}