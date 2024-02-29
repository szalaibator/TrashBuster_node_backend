import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);

// import serverless from "serverless-http";

// import App from "../../src/app";
// import AuthenticationController from "../../src/authentication/authentication.controller";
// import AuthorController from "../../src/author/author.controller";
// import PostController from "../../src/post/post.controller";
// import RecipeController from "../../src/recipe/recipe.controller";
// import ReportController from "../../src/report/report.controller";
// import UserController from "../../src/user/user.controller";

// const api: App = new App([
//     new AuthenticationController(),
//     new UserController(),
//     new PostController(),
//     new RecipeController(),
//     new AuthorController(),
//     new ReportController(),
// ]);

// export const handler = serverless(api.getServer());
