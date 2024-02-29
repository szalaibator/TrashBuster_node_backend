import { NextFunction, Request, Response, Router } from "express";
import ISession from "interfaces/session.interface";
import { Types } from "mongoose";

import authorModel from "../author/author.model";
import HttpException from "../exceptions/HttpException";
import IdNotValidException from "../exceptions/IdNotValidException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import IController from "../interfaces/controller.interface";
import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import postModel from "../post/post.model";
import CreateUserDto from "./user.dto";
import IUser from "./user.interface";
import userModel from "./user.model";

export default class UserController implements IController {
    public path = "/users";
    public router = Router();
    private user = userModel;
    private post = postModel;
    private author = authorModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/posts/:id`, authMiddleware, this.getAllPostsOfUserByID);
        this.router.get(`${this.path}/posts/`, authMiddleware, this.getAllPostsOfLoggedUser);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(this.path, authMiddleware, this.getAllUsers);
        this.router.get(`${this.path}/posts/search/:keyword`, this.getUsersPostsWithSearch);

        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateUserDto, true)], this.modifyUser);

        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
    }

    private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.user.find().then(users => {
                res.send(users);
            });
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }

                // Multiple populates:
                const user = await this.user.findById(id).populate("posts").populate("recipes");
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const userData: IUser = req.body;
                const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
                if (user) {
                    res.send(user);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const successResponse = await this.user.findByIdAndDelete(id);
                if (successResponse) {
                    res.sendStatus(200);
                } else {
                    next(new UserNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllPostsOfLoggedUser = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const id = (req.session as ISession).user_id; // Stored user's ID in Cookie
            const posts = await this.post.find({ user_id: id });
            res.send(posts);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllPostsOfUserByID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (Types.ObjectId.isValid(req.params.id)) {
                const id: string = req.params.id;
                const posts = await this.author.find({ user_id: id }).select("-user_id").populate("post", "-_id");
                res.send(posts);
            } else {
                next(new IdNotValidException(req.params.id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    private getUsersPostsWithSearch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const myRegex = new RegExp(req.params.keyword, "i"); // "i" for case-insensitive

            const data = await this.user.aggregate([
                {
                    $lookup: { from: "authors", foreignField: "user_id", localField: "_id", as: "author" },
                },
                {
                    $lookup: { from: "posts", foreignField: "_id", localField: "author.post_id", as: "post" },
                },
                {
                    $match: { $and: [{ "address.street": myRegex }, { "post.content": myRegex }] },
                    // $match: { "FK_neve.field1": req.params.keyword },
                },
                // {
                //     // convert array of objects to simple array (alias name):
                //     $unwind: "$FK_neve",
                // },
                { $project: { name: 1, "address.street": 1, post: 1 } },
            ]);
            res.send(data);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
