import db from "#db/client";
import createFile from "./queries/files";
import createFolder from "./queries/folders";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folders = [
    { name: "Documents" },
    { name: "Photos" },
    { name: "Music" },
    { name: "Videos" },
    { name: "Downloads" },
    { name: "Work" },
    { name: "School" },
    { name: "Projects" },
    { name: "Backups" },
    { name: "Archives" },
  ];

  const createdFolders = [];
  for (const folder of folders){
    const createdFolder = await createFolder(folder);
    createdFolders.push(createdFolder);
  }

  const fileTemplates = [
    { name: "notes.txt", size: 40 },
    { name: "draft.docx", size: 220 },
    { name: "final.pdf", size: 520 },
    { name: "archive.zip", size: 1400 },
    { name: "snapshot.png", size: 860 },
  ];

  const files = createdFolders.flatMap((folder, folderIndex) =>
    fileTemplates.map((template, templateIndex) => ({
      name: `${folder.name.toLowerCase()}-${template.name}`,
      size: template.size + (folderIndex + 1) * 10 + templateIndex,
      folder_id: folder.id,
    }))
  );

  for (const file of files){
    await createFile(file);
  }
}
