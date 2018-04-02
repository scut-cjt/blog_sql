const express = require('express');
const app = express();

app.set('jwtTokenSecret', 'LOVE_YAN_BABY');

module.exports = app;