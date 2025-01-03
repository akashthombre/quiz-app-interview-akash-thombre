const { validateSubmitAnswer } = require('../models/result.js');
const Quiz = require('../models/quiz.js');
const Result = require('../models/result.js');

//Endpoint to submit answer 
const submitAnswer = async (req, res) => {
    //payload from client
    const { quizId, questionId, selectedOption, userId } = req.body;
    try {
        // Validate payload body
        const { error } = validateSubmitAnswer(req.body);
        if (error) return res.status(400).send({ error: 'Bad Request', message: error.message });

        const quiz = await Quiz.findOne({ _id: quizId });
        if (!quiz) return res.status(404).send({ error: 'Bad Request', message: 'Quiz not found by this id.' });

        //check if question matched for a quiz
        const question = quiz.questions.find((q) => q._id.toString() === questionId);
        if (!question) return res.status(404).send({ error: 'Bad Request', message: 'Question not found' });

        // Check if the user has already answered this question
        const existingResult = await Result.findOne({ quizId, userId });
        if (existingResult) {
            const questionAnswered = existingResult.answers.find((ans) => ans.questionId.toString() === questionId);
            //return error
            if (questionAnswered) return res.status(400).send({ error: 'Bad Request', message: 'You have already answered this question.' });
        }

        //return isCorrect ttue if matched selectedOption & correctOption for question else false
        const isCorrect = selectedOption === question.correctOption;
        //created answer object for save
        const answer = { questionId, selectedOption, isCorrect };

        // Check if a result already saved for this quiz and user
        if (existingResult) {
            // If the result already saved, push the new answer into the answers array
            existingResult.answers.push(answer);

            existingResult.score = existingResult.answers.filter((ans) => ans.isCorrect).length;
            //save updated result to db
            await existingResult.save();
        } else {
            //else create and save newly to db
            const newResult = new Result({
                quizId,
                userId,
                score: isCorrect ? 1 : 0, // for incorrect score will be 0 else 1
                answers: [answer],
            });
            await newResult.save();
        }

        //return
        return res.status(200).send({ message: isCorrect ? 'Correct!' : `Incorrect. The correct answer is option ${question.correctOption}`, data: answer });

    } catch (error) {
        return res.status(500).send({ error: 'Oops! Something went wrong here...', message: error.message });
    }
};

//Endpoint to  get the user result for a specific quiz.Return the score and a summary 
const getResults = async (req, res) => {
    const { quizId, userId } = req.query;
    try {
        const result = await Result.findOne({ quizId: quizId, userId: userId })
        //not found
        if (!result) return res.status(404).send({ error: 'Bad Request', message: 'No results found' });
        //return score and summary of answers submitted for a quiz
        const score = result.score;
        const summary = result.answers;
        //return
        return res.status(200).send({ message: 'Result fetched successfully!', data: { score, summary } });

    } catch (error) {
        return res.status(500).send({ error: 'Oops! Something went wrong here...', message: error.message });
    }
};

module.exports = {
    submitAnswer,
    getResults
}