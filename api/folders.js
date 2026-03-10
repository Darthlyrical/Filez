import express from 'express';
import * as foldersQueries from '../db/queries/folders.js';
import * as filesQueries from '../db/queries/files.js';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
    res.send(await foldersQueries.getFolders())
})

router.get('/:id', async (req, res) => {
    const folder = await foldersQueries.getFolderById(Number(req.params.id));
    if(!folder) return res.status(404).send('Folder ID does not exist.');

    res.send(folder);
})

router.post("/:id/files", async (req, res, next) => {
  try {
    const folderId = Number(req.params.id);

    const folder = await foldersQueries.getFolderById(folderId);
    if (!folder) return res.status(404).send("Folder not found.");

    if (req.body === undefined) {
      return res.status(400).send("Request body is required.");
    }

    const { name, size } = req.body;
    if (name === undefined || size === undefined) {
      return res.status(400).send("Missing required fields: name, size.");
    }

    const file = await filesQueries.createFile({
      name,
      size,
      folder_id: folderId,
    });

    res.status(201).send(file);
  } catch (err) {
    next(err);
  }
});