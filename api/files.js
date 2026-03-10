import express from 'express';
import * as filesQueries from '../db/queries/files.js'


const router = express.Router();
export default router;


router.get('/', async (req,res)=>{
    res.send(await filesQueries.getFiles());
})
