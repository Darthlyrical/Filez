import db from "#db/client";
import {createFile} from "./queries/files.js";
import {createFolder} from "./queries/folders.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folders = [
    { name: "Documents" },
    { name: "Photos" },
    { name: "Music" },
    
  ];

  const files = [
    { name: "resume.pdf", size: 240, folder_id: 1 },
    { name: "taxes-2025.xlsx", size: 512, folder_id: 1 },
    { name: "roadtrip.jpg", size: 1800, folder_id: 1 },
    { name: "birthday.png", size: 950, folder_id: 1 },
    { name: "playlist.mp3", size: 4200, folder_id: 1 },
    { name: "podcast-ep1.mp3", size: 56000, folder_id: 2},
    { name: "demo-reel.mp4", size: 152000, folder_id: 2 },
    { name: "lecture.mov", size: 88000, folder_id: 2 },
    { name: "installer.dmg", size: 125000, folder_id: 2 },
    { name: "ebook.epub", size: 1200, folder_id: 2 },
    { name: "q1-report.docx", size: 860, folder_id: 3 },
    { name: "meeting-notes.txt", size: 42, folder_id: 3 },
    { name: "syllabus.pdf", size: 310, folder_id: 3 },
    { name: "assignment1.zip", size: 7800, folder_id: 3 },
    { name: "app-wireframe.fig", size: 6400, folder_id: 3 },
    
  ];

  for (const folder of folders){
    await createFolder(folder);
  }

  for (const file of files){
    await createFile(file);
  }
}
