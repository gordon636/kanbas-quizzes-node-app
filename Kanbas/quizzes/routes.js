import * as dao from "./dao.js";

function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const quiz = {
            ...req.body,
            course: cid,
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.json(newQuiz);
    };
    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    };
    const findQuizzesByCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourse(cid);
        res.send(quizzes);
    };
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        if (qid === undefined) {
            res.status(404).json({ message: `Unable to update quiz with ID ${qid}` });
            return;
        }
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    const findQuizById = async (req, res) => {
        const { qid } = req.params;
        if (qid === undefined) {
            res.status(404).json({ message: `Unable to find quiz with ID ${qid}` });
            return;
        }
        const status = await dao.findQuizById(qid, req.body);
        res.json(status);
    }

    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.get("/api/quizzes/:qid", findQuizById);

}
export default QuizRoutes;