import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { postsRoutes } from "../modules/post/post.routes";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: postsRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
