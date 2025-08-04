import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logRoute from "./routes/logRoute";
import authorizationRoute from "./routes/authorizationRoute";
import statsRoute from "./routes/statsRoute";
import exerciseRoute from "./routes/exerciseRoute";
import muscleGroupRoute from "./routes/muscleGroupRoute";
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use('/api/authorization', authorizationRoute);
app.use(express.json());
app.use('/api/logs', logRoute);
app.use('/api/exercises', exerciseRoute);
app.use('/api/stats', statsRoute)
app.use('/api/muscle-groups', muscleGroupRoute)
app.use(cors());


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});