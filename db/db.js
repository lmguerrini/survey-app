const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/survey-app"
);

// Creator

module.exports.addQuestions = (questions) => {
    const q = `INSERT INTO questions (questions) 
    VALUES ($1) RETURNING *`;
    const params = [questions];
    return db.query(q, params);
};

module.exports.getSurveyQuestions = () => {
    const q = `SELECT * FROM questions`;
    return db.query(q);
};

module.exports.getSurveyAnswers = () => {
    const q = `SELECT * FROM answers`;
    return db.query(q);
};

// Participant

module.exports.getSurvey = (surveyId) => {
    const q = `SELECT * FROM questions WHERE id = $1`;
    const params = [surveyId];
    return db.query(q, params);
};

module.exports.addAnswers = (survey_id, answers) => {
    const q = `INSERT INTO answers (survey_id, answers) 
    VALUES ($1, $2) RETURNING *`;
    const params = [survey_id, answers];
    return db.query(q, params);
};
