const express = require('express');

const connects = require('./schemas/db');

connects();

const app = express();
app.listen(3000, () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});