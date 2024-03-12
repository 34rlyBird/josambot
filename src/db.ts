const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/admin";

mongoose.connect(dbUrl)

const db = mongoose.connection;

const handleOpen = () => console.log('몽고디비 연결됨');
const handleError = (error: any) => console.log("몽고디비 연결 에러", error);

db.once('open', handleOpen);
db.on('error', handleError);