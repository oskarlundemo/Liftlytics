
import {Router} from 'express';
import {fetchCategories} from "../controllers/logController";

const logRoute = Router();

logRoute.get('/', fetchCategories);

logRoute.post('/new', async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message: 'posting route',
    })
})

export default logRoute;