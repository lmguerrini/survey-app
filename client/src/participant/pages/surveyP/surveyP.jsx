import Header from "../../components/headerP/headerP";
import ButtonsNavigate from "../../components/buttonsP/buttonsNavigateP";
import ErrorSubmit from "../../status/survey-submit-error/errorSubmitP";
import "./surveyP.css";
import { useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ParticipantSurvey() {
    const { pathname } = useLocation();
    const [survey, setSurvey] = useState([]);
    const [surveyTitle, setSurveyTitle] = useState();
    const [aMoreValues, setAMoreValues] = useState([]);
    const [allAnswers, setAllAnswers] = useState({});
    const [errorSubmit, setErrorSubmit] = useState(false);

    const changeHandler = (e) => {
        setAllAnswers((prevValues) => {
            // handling error (if no answers)
            if (errorSubmit) {
                setErrorSubmit(false);
            }
            // handling number values
            if (!isNaN(e.target.value)) {
                return {
                    ...prevValues,
                    [e.target.name]: Number(e.target.value),
                };
                // handling multiple answers
            } else if (e.target.name.length > 3) {
                setAMoreValues([...aMoreValues, e.target.value]);
                return {
                    ...prevValues,
                    [e.target.name.slice(0, -2)]: [
                        ...aMoreValues,
                        e.target.value,
                    ],
                };
                // handling textarea "#tA"
            } else if (e.target.id === "tA") {
                return {
                    ...prevValues,
                    [e.target.name]: e.target.value.toLowerCase(),
                };
            } else {
                return { ...prevValues, [e.target.name]: e.target.value };
            }
        });
    };

    const getSurvey = async () => {
        const { data } = await axios.get(
            `/api/participant/welcome/${pathname.replace(/[^0-9]/g, "")}`
        );
        setSurveyTitle(data.surveyTitle);
        setSurvey(data.survey[0].questions);
    };
    useEffect(() => {
        getSurvey();
    });

    return (
        <>
            <Header />
            <section>
                <div className="surveyContainer">
                    <h1>{surveyTitle}</h1>
                    <ol>
                        {Object.keys(survey).map((key, index) => (
                            <div key={index} className="">
                                {/* <p>{index}</p> */}
                                {/* <p>{Object.keys(survey[key]).length}</p> */}
                                {survey[key]["Type of answer"] === "Range" && (
                                    <>
                                        <li>{survey[key].Question}</li>
                                        <div className="rangeContainer">
                                            <span>not at all likely</span>
                                            <span>extremely likely</span>
                                        </div>
                                        <input
                                            id="range"
                                            type="range"
                                            min="0"
                                            max="10"
                                            name={
                                                index === 0 ? "a1" : "a" + index
                                            }
                                            // value={a1}
                                            step="1"
                                            // onChange={(e) => setA1(Number(e.target.value))}
                                            onChange={(e) => changeHandler(e)}
                                        />
                                    </>
                                )}
                                {survey[key]["Type of answer"] ===
                                    "Choose 1 answer" && (
                                    <>
                                        <li>{survey[key].Question}</li>
                                        {Object.keys(survey[key].Options).map(
                                            (optionsKey, idx) => (
                                                <div
                                                    key={idx}
                                                    className="oneAContainer"
                                                >
                                                    <input
                                                        type="radio"
                                                        // name="satisfaction"
                                                        name={"a" + index}
                                                        value={
                                                            survey[key].Options[
                                                                optionsKey
                                                            ]
                                                        }
                                                        onChange={(e) =>
                                                            changeHandler(e)
                                                        }
                                                    />
                                                    {
                                                        survey[key].Options[
                                                            optionsKey
                                                        ]
                                                    }
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                                {survey[key]["Type of answer"] ===
                                    "Choose 1+ answers" && (
                                    <>
                                        <li>{survey[key].Question}</li>
                                        {Object.keys(survey[key].Options).map(
                                            (optionsKey, idx) => (
                                                <div
                                                    key={idx}
                                                    className="oneAContainer"
                                                >
                                                    <input
                                                        type="radio"
                                                        // name="satisfaction"
                                                        name={
                                                            "a" +
                                                            index +
                                                            "-" +
                                                            idx
                                                        }
                                                        value={
                                                            survey[key].Options[
                                                                optionsKey
                                                            ]
                                                        }
                                                        onChange={(e) =>
                                                            changeHandler(e)
                                                        }
                                                    />
                                                    {
                                                        survey[key].Options[
                                                            optionsKey
                                                        ]
                                                    }
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                                {survey[key]["Type of answer"] === "Text" && (
                                    <>
                                        <li>{survey[key].Question}</li>
                                        <textarea
                                            name={"a" + index}
                                            rows="4"
                                            cols="50"
                                            id="tA"
                                            onChange={(e) => changeHandler(e)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </ol>
                </div>
            </section>
            {errorSubmit && <ErrorSubmit />}
            <ButtonsNavigate
                propsFromSurvey={allAnswers}
                setErrorSubmit={setErrorSubmit}
            />
        </>
    );
}

export default ParticipantSurvey;
