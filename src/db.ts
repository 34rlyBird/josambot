const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/josambot";

mongoose.connect(dbUrl)

const db = mongoose.connection;

const handleOpen = () => console.log('몽고디비 연결됨');
const handleError = (error: any) => console.log("몽고디비 연결 에러", error);

db.once('open', handleOpen);
db.on('error', handleError);

const scheDocs = mongoose.connection.collections['schedules'];
if (scheDocs) {
  scheDocs.drop(function (err: any) {
    console.log('schedules collection dropped');
  });
};

const idDocs = mongoose.connection.collection['id2nicks'];
if (idDocs) {
  idDocs.drop(function (err: any) {
    console.log('id2nicks collection dropped');
  });
}