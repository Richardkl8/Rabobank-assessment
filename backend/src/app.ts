import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/statements.routes';
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
