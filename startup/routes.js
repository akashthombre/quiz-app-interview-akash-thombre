//Routes
const express = require('express');
const quizRoute = require('../routes/quiz.js');
const resultRoute = require('../routes/result.js');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/v1/quiz', quizRoute);
    app.use('/api/v1/result', resultRoute);
}