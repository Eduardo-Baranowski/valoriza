import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticatedUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUsersController";
const router = Router();

const createUserCrontroller = new CreateUserController();
const createTagController = new CreateTagController();
const authenticatedUserController = new AuthenticatedUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsService = new ListUserSendComplimentsController();
const listUserReceiveComplimentsService = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUserController();

router.post("/users", createUserCrontroller.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticatedUserController.handle);
router.post("/compliments", ensureAuthenticated, ensureAdmin ,createComplimentController.handle);

router.get("/user/compliments/send", ensureAuthenticated, listUserSendComplimentsService.handle )
router.get("/user/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsService.handle)

router.get("/tags", ensureAuthenticated, listTagsController.handle)

router.get("/users", ensureAuthenticated, listUsersController.handle)
export {router};
