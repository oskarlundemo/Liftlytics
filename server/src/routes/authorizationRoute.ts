



import {Router} from 'express';
import {syncUserWithDb} from "../controllers/authorizationController";

const authorizationRoute = Router();

authorizationRoute.post('/sync-user', syncUserWithDb);

export default authorizationRoute;