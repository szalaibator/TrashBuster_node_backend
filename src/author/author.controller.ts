import { NextFunction, Request, Response, Router } from "express";
// import ISession from "interfaces/session.interface";
import { Types } from "mongoose";

import AuthorNotFoundException from "../exceptions/AuthorNotFoundException";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import IController from "../interfaces/controller.interface";
import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateAuthorDto from "./author.dto";
import IAuthor from "./author.interface";
import authorModel from "./author.model";

export default class PostController implements IController {
    public path = "/authors";
    public router = Router();
    private author = authorModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, [authMiddleware, roleCheckMiddleware(["user", "admin"])], this.getAllAuthors);
        this.router.get(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.getAuthorById);
        this.router.get(`${this.path}/:offset/:limit/:order/:sort/:keyword?`, [authMiddleware, roleCheckMiddleware(["user"])], this.getPaginatedAuthors);
        this.router.patch(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateAuthorDto, true)], this.modifyAuthor);
        this.router.delete(`${this.path}/:id`, [authMiddleware, roleCheckMiddleware(["admin"])], this.deleteAuthor);
        this.router.post(this.path, [authMiddleware, roleCheckMiddleware(["admin"]), validationMiddleware(CreateAuthorDto)], this.createAuthor);
    }

    private getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const posts = await this.post.find().populate("user_id", "-password");
            const count = await this.author.countDocuments();
            const posts = await this.author.find();
            res.send({ count: count, posts: posts });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getPaginatedAuthors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let posts = [];
            let count: number = 0;
            if (req.params.keyword && req.params.keyword != "") {
                const myRegex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.author.find({ $or: [{ user_id: myRegex }, { post_id: myRegex }] }).countDocuments();
                posts = await this.author
                    .find({ $or: [{ title: myRegex }, { content: myRegex }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.author.countDocuments();
                posts = await this.author
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, posts: posts });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const post = await this.author.findById(id).populate("user");
                if (post) {
                    res.send(post);
                } else {
                    next(new AuthorNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const authorData: IAuthor = req.body;
                const post = await this.author.findByIdAndUpdate(id, authorData, { new: true });
                if (post) {
                    res.send(post);
                } else {
                    next(new AuthorNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private createAuthor = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const authorData: IAuthor = req.body;
            const createdAuthor = new this.author({
                ...authorData,
                // user_id: (req.session as ISession).user_id,
            });
            const savedAuthor = await createdAuthor.save();
            await savedAuthor.populate("user");
            const count = await this.author.countDocuments();
            res.send({ count: count, post: savedAuthor });
            // res.send(savedPost);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.author.findByIdAndDelete(id);
                if (successResponse) {
                    // const count = await this.post.countDocuments();
                    // res.send({ count: count, status: 200 });
                    res.sendStatus(200);
                } else {
                    next(new AuthorNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
