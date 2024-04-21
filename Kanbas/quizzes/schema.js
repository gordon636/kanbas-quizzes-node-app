import mongoose from "mongoose";
import moment from "moment";

const quizSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    published: { type: Boolean, required: true, default: false },
    course: String,
    quizType: {
        type: String,
        enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
        default: "GRADED_QUIZ",
    },
    assignmentGroup: {
        type: String,
        enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
        default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, default: moment().startOf('day') },
    availableDate: { type: Date, default: moment().add(-1, 'days').startOf('day') },
    untilDate: { type: Date, default: moment().add(1, 'days').startOf('day') },
    questions: [{
        title: { type: String, required: true },
        points: { type: Number, required: true, default: 1 },
        questionType: {
            type: String,
            enum: ["TRUE_FALSE", "MULTIPLE_CHOICE", "FILL_IN"],
            default: "MULTIPLE_CHOICE",
            required: true
        },
        question: String,
        mutlipleChoiceQuestionAnswers: [{
            answer: String,
            correct: Boolean
        }],
        trueFalseAnswer: Boolean,
        fillInBlankAnswers: [String]
    }]
},
    { collection: "quizzes" });
export default quizSchema;