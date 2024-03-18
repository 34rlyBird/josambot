import mongoose from "mongoose";

// connect to mongodb
const dbUrl = "mongodb://localhost:27017/josambot";

mongoose.connect(dbUrl);

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
 * @param {string} colname  - collection name
 */
async function dropCollection(colname: string) {
  if (colname === "schedules") {
    const scheDocs = mongoose.connection.collections.schedules;
    if (scheDocs) {
      scheDocs.drop().then(() => console.log("schedules collection dropped"));
    }
  }
  if (colname === "id2nicks") {
    const idDocs = mongoose.connection.collections.id2nicks;
    if (idDocs) {
      idDocs.drop().then(() => console.log("id2nicks collection dropped"));
    }
  }
}

/**
 * Return true if collection exists
 * @param {string} colname - collection name
 * @returns {boolean}
 */
async function isColExists(colname: string): Promise<boolean> {
  if (colname === "schedules") {
    const scheDocs = mongoose.connection.collections.schedules;
    if (scheDocs) return true;
    return false;
  }
  if (colname === "id2nicks") {
    const idDocs = mongoose.connection.collections.id2nicks;
    if (idDocs) return true;
    return false;
  }
  return false;
}

export { dropCollection, isColExists };
