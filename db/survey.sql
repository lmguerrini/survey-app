DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE questions (
    id SERIAL NOT NULL PRIMARY KEY,
    questions JSON NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answers (
    id SERIAL NOT NULL PRIMARY KEY,
    survey_id INT NOT NULL REFERENCES questions(id),
    answers JSON NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

