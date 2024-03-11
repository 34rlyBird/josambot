import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/admin";

const connect = () => {
  mongoose.connect(dbUrl, {
    dbName: "nodejs",
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log("몽고디비 연결 에러", error);
    } else {
      console.log("몽고디비 연결 성공");
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;