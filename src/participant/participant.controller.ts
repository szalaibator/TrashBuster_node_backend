import { NextFunction, Request, Response, Router } from "express";
import ISession from "interfaces/session.interface";
import { Types } from "mongoose";

import authorModel from "../sample_author/author.model";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import IController from "../interfaces/controller.interface";
import IParticipant from "./participant.interface";
import CreateParticipantDto from "./participant.dto";
import participantModel from "./participant.model";
import authMiddleware from "../middleware/auth.middleware";

export default class ParticipantController implements IController {
    public path = "/";
    public router = Router();
    private participant = participantModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}event/participants/{eventId}`, authMiddleware,);
        this.router.get(`${this.path}participants/user/{userId}`, authMiddleware,);
        this.router.get(`${this.path}participants/events/joined/{userId}`, authMiddleware,);
        this.router.get(`${this.path}participants/check/{eventId}/{userId}`, authMiddleware,);
        this.router.get(`${this.path}participants/delete/{eventId}/{userId}`, authMiddleware,);
        this.router.get(`${this.path}participants/event/{eventId}`, authMiddleware,);
    }
}