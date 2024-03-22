import mongoose from "mongoose";

// connect to mongodb
const dbUrl = "mongodb://localhost:27017/josambot";

// mongoose does not require to await
void mongoose.connect(dbUrl);

const db = mongoose.connection;

// Handlers
const handleOpen = () => console.log("몽고디비 연결됨");
const handleError = (error: mongoose.Error) => console.log("몽고디비 연결 에러", error);

// Event listeners
db.once("open", handleOpen);
db.on("error", handleError);

/**
 * Drop collection with name
 * Actually, you must add new code for new collection
 * @throws {Error} - if invalid collection name
 * @param {string} colname  - collection name
 */
async function dropCollection(colname: string) {
  if (colname === "schedules") {
    const scheDocs = mongoose.connection.collections.schedules;
    await scheDocs.drop();
    console.log("schedules collection dropped");
  } else if (colname === "id2nicks") {
    const idDocs = mongoose.connection.collections.id2nicks;
    await idDocs.drop();
    console.log("id2nicks collection dropped");
  } else throw new Error("Invalid collection name");
}

export { dropCollection };
