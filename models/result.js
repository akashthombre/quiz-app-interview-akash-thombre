const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    selectedOption: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
});

const resultSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    answers: [answerSchema],
});

const Result = mongoose.model('Result', resultSchema);

function validateSubmitAnswer(data) {
    const schema = Joi.object({
        quizId: Joi.string().length(24).required(),
        userId: Joi.string().required(),
        questionId: Joi.string().length(24).required(),
        selectedOption: Joi.number().integer().min(0).required()
    });
    return { error } = schema.validate(data);
}


module.exports = Result;
module.exports.validateSubmitAnswer = validateSubmitAnswer;
