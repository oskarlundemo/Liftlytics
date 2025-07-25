import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logRoute from "./routes/logRoute";
import authorizationRoute from "./routes/authorizationRoute";
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
app.use(cors());


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});