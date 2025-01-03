const { validateQuizData } = require('../models/quiz.js');
const Quiz = require('../models/quiz.js');

//Endpoint to create a new quiz with a set of questions.
const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        // validate payload body
        const { error } = validateQuizData(req.body);
        // if client send invalid data return 400 'Bad Request' 
        if (error) return res.status(400).send({ error: 'Bad Request', message: error.message });

        const newQuiz = new Quiz({
            title,
            questions,
        });

        await newQuiz.save(); //save to db
        //return
        return res.status(201).send({ message: 'Record added successfully!', data: newQuiz });
    } catch (error) {
        return res.status(500).send({ error: 'Oops! Something went wrong here...', message: error.message });
    }
}

//Endpoint to get quiz by its id and return the questions without revealing the correct answers.
const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ _id: req.params.id }).select('-questions.correctOption'); //removed correctOption from result
        //if not found
        if (!quiz) return res.status(404).send({ error: 'Bad Request', message: 'Quiz not found by this id.' });
        //return
        return res.status(200).send({ message: 'Record fetched successfully!', data: quiz });

    } catch (error) {
        return res.status(500).send({ error: 'Oops! Something went wrong here...', message: error.message });
    }
};


module.exports = {
    createQuiz,
    getQuiz
}