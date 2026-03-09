import db from '../client.js';


/**
 * 
 * @param {name: string, size: number, folder_id: number} Accepts an object with required key:value pairs 
 * @returns The file created.
 */
export default async function createFile({name,size,folder_id}){
    const text = `INSERT INTO files(name,size,folder_id)
    VALUES($1,$2,$3)
    RETURNING *;`;
    const values = [name,size,folder_id];
    const { rows:[file] } = await db.query(text,values);
    return file;
}