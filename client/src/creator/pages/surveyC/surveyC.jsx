import CreatorHeader from "../../components/headerC/headerC";
import CreatorButtonsNavigate from "../../components/buttonsC/buttonsNavigateC";
import "./surveyC.css";
import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
// import axios from "axios";

function CreatorSurvey() {
    const [newSurvey, setNewSurvey] = useState({});
    const [qCount, setQCount] = useState(1); // number of questions
    const [currentQ, setCurrentQ] = useState(); // current question
    const [errorSubmit, setErrorSubmit] = useState(false); // handling error
    const [errorSubmitQ, setErrorSubmitQ] = useState([]); // error incomplete question(s)
    const [deleteLastQ, setDeleteLastQ] = useState(false); // handling last question deletion

    // set & rendering question(s) & relative answer options
    const questions = [];
    for (let i = 1; i <= qCount; i++) {
        questions.push(
            <li
                className={
                    errorSubmit && errorSubmitQ.indexOf(i) > -1
                        ? "liContainer error"
                        : "liContainer"
                }
                key={i}
            >
                <div className="titleContainer">
                    <h3>Question {i}:</h3>
                    <input
                        type="text"
                        name="Question"
                        onChange={(e) => {
                            setNewSurvey((prevValues) => {
                                return {
                                    ...prevValues,
                                    [[e.target.name] + " " + i]: {
                                        ...prevValues[
                                            [e.target.name] + " " + i
                                        ],
                                        [e.target.name]: e.target.value,
                                    },
                                };
                            });
                            setErrorSubmitQ((errorSubmitQ) =>
                                errorSubmitQ.filter((n) => n !== i)
                            );
                        }}
                        onClick={(e) => setCurrentQ(i)}
                        placeholder={
                            i === 1
                                ? "Insert here the first question of your new Survey.."
                                : "Insert here a new question for your Survey.."
                        }
                    ></input>
                </div>
                <div className="titleContainer">
                    <h3>Type of answer {i}:</h3>
                    <select
                        name="answer types"
                        defaultValue={"DEFAULT"}
                        onClick={(e) => setCurrentQ(i)}
                        onChange={(e) => {
                            setNewSurvey((prevValues) => {
                                return {
                                    ...prevValues,
                                    ["Question " + i]: {
                                        ...prevValues["Question " + i],
                                        "Type of answer": e.target.value,
                                    },
                                };
                            });
                            setErrorSubmitQ((errorSubmitQ) =>
                                errorSubmitQ.filter((n) => n !== i)
                            );
                        }}
                    >
                        <option value="DEFAULT" disabled hidden>
                            Choose a type..
                        </option>
                        <option value="Range">Range</option>
                        <option value="Choose 1 answer">
                            Choose 1 answer from options
                        </option>
                        <option value="Choose 1+ answers">
                            Choose 1+ answers from options
                        </option>
                        <option value="Text">Text</option>
                    </select>
                    {newSurvey["Question " + i] &&
                        newSurvey["Question " + i].hasOwnProperty(
                            "Type of answer"
                        ) &&
                        newSurvey["Question " + i]["Type of answer"] ===
                            "Range" && (
                            <>
                                <h3>Range value from 0 to (1-5):</h3>
                                <input
                                    type="number"
                                    name="Range number"
                                    id="inputNumber"
                                    min="1"
                                    max="5"
                                    // onChange={(e) =>
                                    //     setRangeMaxValue(Number(e.target.value))
                                    // }
                                    onChange={(e) =>
                                        setNewSurvey((prevValues) => {
                                            return {
                                                ...prevValues,
                                                ["Question " + i]: {
                                                    ...prevValues[
                                                        "Question " + i
                                                    ],
                                                    [e.target.name]: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            };
                                        })
                                    }
                                    onClick={(e) => setCurrentQ(i)}
                                ></input>
                            </>
                        )}
                    {newSurvey["Question " + i] &&
                        newSurvey["Question " + i].hasOwnProperty(
                            "Type of answer"
                        ) &&
                        (newSurvey["Question " + i]["Type of answer"] ===
                            "Choose 1 answer" ||
                            newSurvey["Question " + i]["Type of answer"] ===
                                "Choose 1+ answers") && (
                            <>
                                <h3>Number of options (2-5):</h3>
                                <input
                                    type="number"
                                    name="Options number"
                                    min="2"
                                    max="5"
                                    id="inputNumber"
                                    onChange={(e) =>
                                        setNewSurvey((prevValues) => {
                                            return {
                                                ...prevValues,
                                                ["Question " + i]: {
                                                    ...prevValues[
                                                        "Question " + i
                                                    ],
                                                    [e.target.name]: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            };
                                        })
                                    }
                                    onClick={(e) => setCurrentQ(i)}
                                ></input>
                            </>
                        )}
                    <br />
                </div>
                {newSurvey["Question " + i] &&
                    newSurvey["Question " + i]["Type of answer"] &&
                    newSurvey["Question " + i]["Type of answer"] !== "Range" &&
                    newSurvey["Question " + i]["Type of answer"] !== "Text" &&
                    newSurvey["Question " + i].hasOwnProperty(
                        "Options number"
                    ) &&
                    newSurvey["Question " + i]["Options number"] !==
                        undefined &&
                    [
                        ...Array(newSurvey["Question " + i]["Options number"]),
                    ].map((x, idx) => (
                        <div className="optionsContainer" key={idx}>
                            <h3>
                                A.{i} - Option n. {idx + 1}:
                            </h3>

                            <input
                                name={`a${i}-${idx + 1}`}
                                onChange={(e) =>
                                    setNewSurvey((prevValues) => {
                                        return {
                                            ...prevValues,
                                            ["Question " + i]: {
                                                ...prevValues["Question " + i],
                                                Options: {
                                                    ...prevValues[
                                                        "Question " + i
                                                    ]["Options"],
                                                    [e.target.name]:
                                                        e.target.value,
                                                },
                                            },
                                        };
                                    })
                                }
                                placeholder={`Insert here the option n.${
                                    idx + 1
                                } for the answer to question n.${i}`}
                            />
                        </div>
                    ))}
            </li>
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let incompleteQ = [];
    useEffect(() => {
        // adding question obj on button "Add one question"
        if (Object.keys(newSurvey).length < qCount) {
            setNewSurvey((prevValues) => {
                return {
                    ...prevValues,
                    ["Question " + qCount]: {},
                };
            });
        }
        // removing question obj on button click "Delete last question"
        else if (Object.keys(newSurvey).length > qCount) {
            Object.keys(newSurvey).forEach((key, i) => {
                if (
                    i === Object.keys(newSurvey).length - 1 &&
                    key !== "Title" &&
                    deleteLastQ
                ) {
                    delete newSurvey[key];
                }
            });
        }

        for (const newSurveyKey in newSurvey) {
            // handling question(s) left incomplete
            if (Object.keys(newSurvey[newSurveyKey]).length === 0) {
                incompleteQ.push(
                    Number(newSurveyKey.charAt(newSurveyKey.length - 1))
                );
            }

            if (newSurveyKey === "Question " + currentQ) {
                for (const key in newSurvey[newSurveyKey]) {
                    if (key === "Type of answer") {
                        if (
                            newSurvey[newSurveyKey]["Type of answer"] ===
                            "Range"
                        ) {
                            // handling change type of answer into "Range"
                            Object.keys(newSurvey[newSurveyKey]).forEach(
                                (key) => {
                                    if (
                                        key !== "Question" &&
                                        key !== "Range number" &&
                                        key !== "Type of answer"
                                    ) {
                                        Reflect.deleteProperty(
                                            newSurvey[newSurveyKey],
                                            key
                                        );
                                    }
                                }
                            );
                        }
                        if (
                            newSurvey[newSurveyKey]["Type of answer"] ===
                                "Choose 1 answer" ||
                            newSurvey[newSurveyKey]["Type of answer"] ===
                                "Choose 1+ answers"
                        ) {
                            if (key === "Range number") {
                                delete newSurvey[newSurveyKey][key];
                            }
                            if (key === "Options") {
                                // handling deleted option(s)
                                Object.keys(
                                    newSurvey[newSurveyKey]["Options"]
                                ).forEach((key) => {
                                    if (
                                        newSurvey[newSurveyKey]["Options"] &&
                                        newSurvey[newSurveyKey]["Options"][
                                            key
                                        ] === ""
                                    ) {
                                        delete newSurvey[newSurveyKey][
                                            "Options"
                                        ][key];
                                    }
                                });
                                // adding "Options entered number" property
                                newSurvey[newSurveyKey][
                                    "Options entered number"
                                ] = Object.keys(
                                    newSurvey[newSurveyKey]["Options"]
                                ).length;
                            }
                        }

                        if (
                            newSurvey[newSurveyKey]["Type of answer"] === "Text"
                        ) {
                            // handling change type of answer into "Text"
                            Object.keys(newSurvey[newSurveyKey]).forEach(
                                (key) => {
                                    if (
                                        key !== "Question" &&
                                        key !== "Type of answer"
                                    ) {
                                        Reflect.deleteProperty(
                                            newSurvey[newSurveyKey],
                                            key
                                        );
                                    }
                                }
                            );
                        }
                    }
                }
            }
        }

        // handling error submit
        if (incompleteQ.length === 0 && errorSubmit) {
            setErrorSubmit(false);
        }
        // handling state, after onClick "Delete last question"
        if (deleteLastQ) {
            setDeleteLastQ(!deleteLastQ);
        }

        console.log("newSurvey: ", newSurvey);
    }, [newSurvey, currentQ, qCount, incompleteQ, errorSubmit, deleteLastQ]);

    return (
        <>
            <CreatorHeader />

            <section>
                <div className="surveyContainer">
                    <h1>Here you can create your customized Survey</h1>
                    <div className="titleContainer" id="chooseTitle">
                        <h3>Choose a title:</h3>
                        <input
                            type="text"
                            name="title"
                            width="800px"
                            onChange={(e) =>
                                setNewSurvey((prevValues) => {
                                    return {
                                        ...prevValues,
                                        [e.target.name.charAt(0).toUpperCase() +
                                        e.target.name.slice(1)]:
                                            e.target.value
                                                .charAt(0)
                                                .toUpperCase() +
                                            e.target.value.slice(1),
                                    };
                                })
                            }
                            placeholder="Insert here the title of your Survey.."
                        ></input>
                    </div>
                    <ol>{questions}</ol>
                    <div>
                        <button
                            className="buttonCreateSurvey buttonCreateSurveyPlus"
                            onClick={(e) => setQCount(qCount + 1)}
                        >
                            <AiOutlinePlusCircle className="plusMinusIcon plusIcon" />
                            Add one question
                        </button>
                        {qCount > 1 && (
                            <button
                                className="buttonCreateSurvey buttonCreateSurveyMinus"
                                onClick={(e) => {
                                    setQCount(qCount - 1);
                                    setDeleteLastQ(true);
                                }}
                            >
                                <AiOutlineMinusCircle className="plusMinusIcon minusIcon" />
                                Delete last question
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <CreatorButtonsNavigate
                newSurvey={newSurvey}
                error={incompleteQ}
                incompleteLiveQ={errorSubmitQ}
                setErrorSubmit={setErrorSubmit}
                setErrorSubmitQ={setErrorSubmitQ}
            />
        </>
    );
}

export default CreatorSurvey;
