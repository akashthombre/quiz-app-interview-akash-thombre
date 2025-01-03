const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.js');

router.post('/createQuiz', quizController.createQuiz);
router.get('/getQuiz/:id', quizController.getQuiz);

module.exports = router;
