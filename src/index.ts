import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3500;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Only start server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;