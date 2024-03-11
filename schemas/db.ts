const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/admin";

const connect = () => {
  mongoose.connect(dbUrl, {
    dbName: "nodejs",
  })
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;