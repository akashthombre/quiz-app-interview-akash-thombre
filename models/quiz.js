const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

//validate payload 
function validateQuizData(data) {
    const schema = Joi.object({
        title: Joi.string().required(),
        questions: Joi.array().items(
            Joi.object({
                text: Joi.string().required(),
                options: Joi.array().items(Joi.string()).length(4).required(),
                correctOption: Joi.number().integer().min(0).max(4).required()
            })
        ).min(1).required()
    });
    return { error } = schema.validate(data);
}


module.exports = Quiz;
module.exports.validateQuizData = validateQuizData;
