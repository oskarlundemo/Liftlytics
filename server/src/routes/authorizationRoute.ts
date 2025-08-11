



import {Router} from 'express';
import {deleteUserFromDB, syncUserWithDb} from "../controllers/authorizationController";
import {authenticateUser} from "../middleware/supabase";

const authorizationRoute = Router();

authorizationRoute.post('/sync-user', syncUserWithDb);

authorizationRoute.delete('/delete-user', authenticateUser, deleteUserFromDB);

export default authorizationRoute;