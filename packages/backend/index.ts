import express, { Request, Response } from 'express'
const app = express();
const PORT = 3001;

app.get("/status-check", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => console.log(`App's running on port ${PORT}}`));
