import db from '../client.js'



/**
 * 
 * @param {name: string} accepts an object with key:value pair for name 
 * @returns the folder created with the assigned name.
 */
export default async function createFolder({name}){
    const text = `INSERT INTO folders(name)
    VALUES($1)
    RETURNING *;`;
    const { rows:[folder] } = await db.query(text, [name]);
    return folder;
}