import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
// Creator
import CreatorWelcome from "./creator/pages/welcomeC/welcomeC";
import CreatorSurvey from "./creator/pages/surveyC/surveyC";
import CreatorThanks from "./creator/pages/thanksC/thanksC";
import CreatorResult from "./creator/pages/resultsC/resultsC";
// Participant
import ParticipantWelcome from "./participant/pages/welcomeP/welcomeP";
import ParticipantSurvey from "./participant/pages/surveyP/surveyP";
import ParticipantThanks from "./participant/pages/thanksP/thanksP";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Creator */}
                    <Route exact path="/" element={<CreatorWelcome />} />
                    <Route path="/creator/survey" element={<CreatorSurvey />} />
                    <Route path="/creator/thanks/:surveyId" element={<CreatorThanks />} />
                    <Route
                        path="/creator/results"
                        element={<CreatorResult />}
                    />

                    {/* Participant */}
                    <Route
                        path="/participant/welcome/:surveyId"
                        element={<ParticipantWelcome />}
                    />
                    <Route
                        path="/participant/survey/:surveyId"
                        element={<ParticipantSurvey />}
                    />
                    <Route
                        path="/participant/thanks/:surveyId"
                        element={<ParticipantThanks />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
