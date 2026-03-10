import db from '../client.js'



/**
 * 
 * @param {name: string} accepts an object with key:value pair for name 
 * @returns the folder created with the assigned name.
 */
export async function createFolder({name}){
    const text = `INSERT INTO folders(name)
    VALUES($1)
    RETURNING *;`;
    const { rows:[folder] } = await db.query(text, [name]);
    return folder;
}

export async function getFolders() {
    const text = `SELECT * FROM folders;`

    const { rows:folders } = await db.query(text);
    return folders;
}

export async function getFolderById(id){
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId) || parsedId < 1) return undefined;

    const text = `
    SELECT
        folders.id,
        folders.name,
        COALESCE(
            (
                SELECT json_agg(files.*)
                FROM files
                WHERE files.folder_id = folders.id
            ),
            '[]'::json
        ) AS files
        FROM folders
        WHERE folders.id = $1;`;
    const { rows:[folder] } = await db.query(text,[id]);
    return folder;
}