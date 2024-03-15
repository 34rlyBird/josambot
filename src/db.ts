import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/josambot";

mongoose.connect(dbUrl);

const db = mongoose.connection;

const handleOpen = () => console.log("몽고디비 연결됨");
const handleError = (error: mongoose.Error) => console.log("몽고디비 연결 에러", error);

db.once("open", handleOpen);
db.on("error", handleError);

async function ClearCollections() {
  const scheDocs = mongoose.connection.collections.schedules;
  if (scheDocs) {
    scheDocs.drop().then(() => console.log("schedules collection dropped"));
  }

  const idDocs = mongoose.connection.collections.id2nicks;
  if (idDocs) {
    idDocs.drop().then(() => console.log("id2nicks collection dropped"));
  }
}

export { ClearCollections };
