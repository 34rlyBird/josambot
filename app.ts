const express = require('express');

const connects = require('./schemas/db');

connects();

const app = express();
app.listen(27017, () => {
  console.log(app.get('port'), '빈 포트에서 대기 중');
});