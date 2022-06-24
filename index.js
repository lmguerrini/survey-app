const express = require("express");
const app = express();
const { urlencoded } = require("express");
const db = require("./db/db");

// middleware to recognize the incoming Request Object as strings or arrays
app.use(urlencoded({ extended: true })); // extended: req.body obj -> values of any type 
// method used to parse the incoming requests with JSON payloads and is based upon the bodyparser
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post("/api/creator/survey-questions", (req, res) => {
    const questions = req.body.allQuestions;
    if (Object.keys(questions).length > 0) {
        db.addQuestions(questions)
            .then(({ rows }) => {
                res.json({
                    success: true,
                    questions: rows,
                });
            })
            .catch((err) => {
                console.log("Error adding Answers to DB", err);
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
            error: "No answers found",
            answers: answers,
        });
    }
});

app.get("/api/creator/results", (req, res) => {
    db.getSurveyQuestions()
        .then(({ rows: surveyQ }) => {
            db.getSurveyAnswers()
                .then(({ rows: surveyA }) => {
                    res.json({
                        success: true,
                        surveyQuestions: surveyQ,
                        surveyAnswers: surveyA,
                    });
                })
                .catch((err) => {
                    console.log("Error getting survey questions", err);
                    res.json({
                        success: false,
                    });
                });
        })
        .catch((err) => {
            console.log("Error getting survey questions", err);
            res.json({
                success: false,
            });
        });
});

app.get("/api/participant/welcome/:surveyId", (req, res) => {
    const surveyId = req.params.surveyId;
    db.getSurvey(surveyId)
        .then(({ rows }) => {
            res.json({
                success: true,
                survey: rows,
                surveyTitle: rows[0].questions.Title,
            });
        })
        .catch((err) => {
            console.log("Error adding Answers to DB", err);
            res.json({
                success: false,
            });
        });
});

app.post("/api/participant/survey-answers", (req, res) => {
    const answers = req.body.allAnswers;
    const surveyId = req.body.surveyId;
    if (Object.keys(answers).length > 0) {
        db.addAnswers(surveyId, answers)
            .then(({ rows }) => {
                res.json({
                    success: true,
                    answers: rows,
                });
            })
            .catch((err) => {
                console.log("Error adding Answers to DB", err);
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
            error: "No answers found",
            answers: answers,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}..`);
});
