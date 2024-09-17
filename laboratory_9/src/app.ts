import express from 'express';
import {Request, Response, NextFunction} from 'express';
import router from './routes/bookRouter';

const app = express();

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
    res.json({success: false, error: 'API NOT Found!'});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({success: false, error: err.message});
})

app.listen(3000, () => console.log('listening on 3000'));