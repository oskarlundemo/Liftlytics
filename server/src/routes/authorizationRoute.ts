



import {Router} from 'express';
import {addUserToDB} from "../controllers/authorizationController";

const authorizationRoute = Router();

authorizationRoute.post('/', addUserToDB);

export default authorizationRoute;