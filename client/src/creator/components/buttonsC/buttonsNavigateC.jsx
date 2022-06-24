import "./buttonsNavigateC.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import CreatorErrorSubmit from "../../status/errorSubmitC";
import React, { useState } from "react";
import axios from "axios";

function CreatorButtonsNavigate(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [errorSubmitSurveyC, setErrorSubmitSurveyC] = useState();

    const handleSubmitSurveyC = (e) => {
        console.log("check ", props.error);
        if (props.error.length > 0) {
            setErrorSubmitSurveyC(true);
            props.setErrorSubmit(true);
            props.setErrorSubmitQ(props.error); // n. incomplete question(s)
        } else {
            axios
                .post("/api/creator/survey-questions", {
                    allQuestions: props.newSurvey,
                })
                .then(({ data }) => {
                    navigate(`/creator/thanks/${data.questions[0].id}`);
                    // location.replace("/");
                    // localStorage.clear();
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
    };

    return (
        <>
            {pathname === "/" && (
                <>
                    <button
                        id="buttonWelcome"
                        onClick={() => navigate("/creator/survey")}
                    >
                        Create New Survey
                    </button>
                    <button
                        id="buttonWelcome"
                        onClick={() => navigate("/creator/results")}
                    >
                        Results &amp; Insights
                    </button>
                </>
            )}
            {pathname === "/creator/survey" && (
                <>
                    {errorSubmitSurveyC && (
                        <CreatorErrorSubmit
                            error={props.incompleteLiveQ.join(", ")}
                        />
                    )}
                    <button onClick={() => navigate("/")}>Creator Home</button>
                    <button onClick={(e) => handleSubmitSurveyC(e)}>
                        Save and Publish
                    </button>
                </>
            )}
            {pathname ===
                `/creator/thanks/${pathname.replace(/[^0-9]/g, "")}` && (
                <>
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/creator/results")}>
                        See results
                    </button>
                </>
            )}
            {pathname === "/creator/results" && (
                <>
                    <button id="btnResults" onClick={() => navigate("/")}>
                        Creator Home
                    </button>
                    <button
                        id="btnResults"
                        onClick={() => navigate("/creator/survey")}
                    >
                        Create New Survey
                    </button>
                </>
            )}
        </>
    );
}

export default CreatorButtonsNavigate;
