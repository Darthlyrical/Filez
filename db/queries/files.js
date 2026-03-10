import db from '../client.js';


/**
 * 
 * @param {name: string, size: number, folder_id: number} Accepts an object with required key:value pairs 
 * @returns The file created.
 */
export async function createFile({ name, size, folder_id }) {
    const text = `INSERT INTO files(name,size,folder_id)
    VALUES($1,$2,$3)
    RETURNING *;`;
    const values = [name, size, folder_id];
    const { rows: [file] } = await db.query(text, values);
    return file;
}

export async function getFiles() {
    const text = `
        SELECT files.*, folders.name AS folder_name
        FROM files
        JOIN folders ON files.folder_id = folders.id;`

    const { rows: files } = await db.query(text);
    return files;

}