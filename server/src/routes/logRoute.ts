
import {Router} from 'express';
import {fetchCategories, saveWorkout} from "../controllers/logController";

const logRoute = Router();

logRoute.get('/', fetchCategories);

logRoute.post('/new', saveWorkout);

export default logRoute;