import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
