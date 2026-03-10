import express from "express";
import foldersRouter from './api/folders.js';
import filesRouter from './api/files.js';

const app = express();
export default app;


app.use(express.json());

app.use((req,res,next)=>{
    const start = Date.now();

    res.on('finish', () =>{
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
    });
    next();
});

app.use('/folders', foldersRouter);

app.use('/files', filesRouter);


app.use((err, req, res, next) =>{
    console.error(err);
    res.status(500).send('There was an error with your request. Please try again later.')
})

