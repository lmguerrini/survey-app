import "./resultsC.css";
import CreatorHeader from "../../components/headerC/headerC";
import CreatorButtonsNavigate from "../../components/buttonsC/buttonsNavigateC";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { MdShowChart } from "react-icons/md";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CreatorResults() {
    const [loading, setLoading] = useState(true); // loading spinner while getting all surveys
    const [surveyQuestions, setSurveyQuestions] = useState([]); // all survey questions
    const [surveyAnswers, setSurveyAnswers] = useState([]); // all survey answers
    const [selectedTitle, setSelectedTitle] = useState(); // title of the selected survey
    const [selectedSurvey, setSelectedSurvey] = useState({}); // questions of selected survey
    const [selectedSurveyAnswers, setSelectedSurveyAnswers] = useState([]); // answers of selected survey
    const [selectedSurveyBool, setSelectedSurveyBool] = useState(true); // survey selected (t/f)
    const [numPeopleSelSurvey, setNumPeopleSelSurvey] = useState(); // n. people who did the selected survey
    const [showChartInsights, setShowChartInsights] = useState(false); // selected survey chart insights (show/hide)

    let surveyId;
    let charToDelete;
    let surveyTitles = [];
    let surveyComments = [];

    if (selectedTitle) {
        surveyId = Number(selectedTitle.replace(/[^0-9.]/g, ""));
        charToDelete = Number(surveyId.toString().length);

        // set survey questions & n. people according to selected survey
        surveyQuestions.forEach((surveyQuestions) => {
            if (surveyQuestions.id === surveyId && selectedSurveyBool) {
                setSelectedSurvey(surveyQuestions.questions);
                setSelectedSurveyBool(false);
                setNumPeopleSelSurvey(
                    Number(surveyAnswers.filter((survey) => survey.survey_id === surveyId).length)
                );
            }
        });

        // set survey answers in relation to selected survey
        surveyAnswers.forEach((surveyAnswers) => {
            if (surveyAnswers.survey_id === surveyId && selectedSurveyBool) {
                setSelectedSurveyAnswers((prevArray) => [...prevArray, surveyAnswers]);
            }
        });
    }

    // set selected survey's title
    if (surveyQuestions && surveyQuestions.length > 0 && surveyAnswers.length > 0) {
        for (var i = 0; i < surveyQuestions.length; i++) {
            surveyTitles.push({
                id: surveyQuestions[i].id,
                title: surveyQuestions[i].questions.Title
            });
        }
    }

    if (selectedSurvey !== undefined && Object.keys(selectedSurvey).length > 0) {
        // adding properties to "selectedSurvey" obj according to "Type of answer"
        for (let key in selectedSurvey) {
            if (key.startsWith("Question")) {
                if (selectedSurvey[key]["Type of answer"].startsWith("Choose 1")) {
                    selectedSurvey[key]["OptionsResults"] = {
                        ...selectedSurvey[key].Options
                    };
                    selectedSurvey[key]["Chart xValues"] = [];
                }
            }
            if (selectedSurvey[key]["Type of answer"] === "Range") {
                selectedSurvey[key]["Range numbers"] = [];
            }
        }

        // restructuring of "OptionsResults" object values for "Chart xValues" (Chart.js)
        for (const [key1, value1] of Object.entries(selectedSurvey)) {
            if (key1.startsWith("Question")) {
                for (const [key2, value2] of Object.entries(value1)) {
                    for (let [key3, value3] of Object.entries(value2)) {
                        if (key2.startsWith("OptionsResults")) {
                            if (value3 !== undefined && typeof value3 === "string") {
                                value2[key3] = {
                                    value: value3,
                                    number: Number(0),
                                    higestNum: false
                                };
                            }
                            selectedSurvey[key1]["Chart xValues"].push(...[value3]);
                        }
                    }
                }
            }
        }

        // handling "Choose 1 answer" / "Choose 1+ answers"
        for (let key1A in selectedSurveyAnswers) {
            for (const [key2A, value2A] of Object.entries(selectedSurveyAnswers[key1A].answers)) {
                // set comments
                if (typeof value2A === "string" && value2A === value2A.toLowerCase()) {
                    surveyComments.push(value2A);
                }
                for (let i = 0; i < Object.keys(selectedSurvey).length; ++i) {
                    if (Object.keys(selectedSurvey)[i].startsWith("Question")) {
                        for (let key1Q in Object.values(selectedSurvey)[i].OptionsResults) {
                            // handling "Choose 1 answer"
                            if (
                                typeof value2A === "string" &&
                                value2A ===
                                    Object.values(selectedSurvey)[i].OptionsResults[key1Q].value &&
                                key2A === key1Q.slice(0, key1Q.indexOf("-"))
                            ) {
                                Object.values(selectedSurvey)[i].OptionsResults[key1Q].number =
                                    Number(
                                        Object.values(selectedSurvey)[i].OptionsResults[key1Q]
                                            .number + 1
                                    );
                            }
                            // handling "Choose 1+ answers"
                            if (
                                typeof value2A === "object" &&
                                value2A.includes(
                                    Object.values(selectedSurvey)[i].OptionsResults[key1Q].value
                                ) &&
                                key2A === key1Q.slice(0, key1Q.indexOf("-"))
                            ) {
                                Object.values(selectedSurvey)[i].OptionsResults[key1Q].number =
                                    Number(
                                        Object.values(selectedSurvey)[i].OptionsResults[key1Q]
                                            .number + 1
                                    );
                            }
                        }
                    }
                    // set "Range" values
                    if (Object.values(selectedSurvey)[i]["Type of answer"] === "Range") {
                        !isNaN(value2A) &&
                            Object.values(selectedSurvey)[i]["Range numbers"].push(Number(value2A));
                    }
                }
            }
        }

        let higestNum = 0;
        for (const [key1S, value1S] of Object.entries(selectedSurvey)) {
            if (value1S.OptionsResults) {
                for (const prop in Object.entries(value1S.OptionsResults)) {
                    console.log("key1S, prop :", key1S, prop);
                    for (let i = 0; i < Object.keys(value1S.OptionsResults).length; ++i) {
                        if (Object.values(value1S.OptionsResults)[i].number >= higestNum) {
                            higestNum = Object.values(value1S.OptionsResults)[i].number;
                            Object.values(value1S.OptionsResults)[i].higestNum = true;
                        } else {
                            Object.values(value1S.OptionsResults)[i].higestNum = false;
                        }
                    }
                }
            } else if (value1S["Type of answer"] === "Range") {
                for (const propRange in Object.entries(value1S["Type of answer"])) {
                    console.log("propRange :", propRange);
                    value1S["Range average"] = Number(
                        (
                            value1S["Range numbers"].reduce((a, b) => a + b, 0) /
                            value1S["Range numbers"].length
                        ).toFixed(0)
                    );
                }
            }
            higestNum = 0;
        }
    }

    const getSurveys = async () => {
        // getSurveyQuestions, getSurveyAnswers
        const { data } = await axios.get("/api/creator/results");
        setSurveyQuestions(data.surveyQuestions);
        setSurveyAnswers(data.surveyAnswers);
        setLoading(false);
    };

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <>
            {" "}
            <CreatorHeader />
            <section className={selectedSurveyBool ? "" : "surveyOuterContainer"}>
                {loading ? (
                    <div className="surveyContainer">
                        <img src="/loading.gif" alt="Loading..." id="loading" />
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : !loading && surveyTitles.length > 0 ? (
                    <div
                        className={
                            selectedSurveyBool
                                ? "surveyContainer surveyContainerNoResults"
                                : "surveyContainer surveyContainerResults"
                        }
                    >
                        {selectedSurveyBool && (
                            <>
                                <h1>View results and insights from your Surveys</h1>
                                <div className="titleContainer" id="chooseTitle">
                                    <h3>Choose a Survey:</h3>
                                    <select
                                        id="chooseList"
                                        name="survey titles"
                                        defaultValue={"DEFAULT"}
                                        onChange={(e) => {
                                            setSelectedSurveyBool(true);
                                            setSelectedTitle(e.target.value);
                                        }}
                                    >
                                        <option value="DEFAULT" disabled hidden>
                                            Choose one from the list..
                                        </option>
                                        {surveyTitles.map((title, index) => (
                                            <option
                                                key={index}
                                                value={title.title + title.id}
                                                // data-value={`{"id": ${title.id}, "title": ${title.title}}`}
                                            >
                                                {title.title}
                                            </option>
                                        ))}
                                    </select>
                                    <img src="/fullTray.png" alt="full Tray" id="fullTray" />
                                </div>
                            </>
                        )}

                        <h1 id="selectedTitle">
                            <b
                                className={
                                    selectedTitle && numPeopleSelSurvey
                                        ? "selectedTitleParentesis"
                                        : " stp1"
                                }
                            >
                                ◎
                            </b>{" "}
                            {selectedTitle &&
                                selectedTitle.substring(
                                    0,
                                    selectedTitle.length - charToDelete
                                )}{" "}
                            <b
                                className={
                                    selectedTitle && numPeopleSelSurvey
                                        ? "selectedTitleParentesis"
                                        : " stp2"
                                }
                            >
                                ◉
                            </b>
                        </h1>
                        <h5>
                            {numPeopleSelSurvey > 0 && numPeopleSelSurvey && (
                                <div>
                                    <code id="numPeopleSelSurvey">
                                        {numPeopleSelSurvey > 0 && numPeopleSelSurvey}
                                    </code>{" "}
                                    people took this Survey
                                </div>
                            )}
                        </h5>
                        <h5>
                            {selectedTitle && numPeopleSelSurvey > 0 && (
                                <>
                                    {!showChartInsights ? "Show" : "Hide"} chart insights 📊📊{" "}
                                    <b id="numPeopleSelSurveyHand"></b>{" "}
                                    <MdShowChart
                                        id="chartShowHideBtn"
                                        onClick={() => setShowChartInsights((prev) => !prev)}
                                    />{" "}
                                </>
                            )}
                        </h5>
                        <ol>
                            {selectedSurvey &&
                                Object.keys(selectedSurvey).map((key, index) => (
                                    <div key={index} className="">
                                        {selectedSurvey[key]["Type of answer"] === "Range" && (
                                            <>
                                                <li id="questions">
                                                    {selectedSurvey[key].Question}
                                                </li>
                                                <div className="rangeContainer">
                                                    <span>not at all likely</span>
                                                    <span>extremely likely</span>
                                                </div>
                                                <input
                                                    id="rangeReadOnly"
                                                    type="range"
                                                    min="0"
                                                    max="10"
                                                    name={index === 0 ? "a1" : "a" + index}
                                                    readOnly
                                                    value={selectedSurvey[key]["Range average"]}
                                                />
                                                <h5>
                                                    {selectedSurvey[key]["Range numbers"] && (
                                                        <code id="avaragePeopRange">
                                                            (avarage of{" "}
                                                            <span id="numHighestNum">
                                                                {
                                                                    selectedSurvey[key][
                                                                        "Range numbers"
                                                                    ].length
                                                                }
                                                            </span>{" "}
                                                            out of{" "}
                                                            <span id="numHighestNum">
                                                                {numPeopleSelSurvey}
                                                            </span>{" "}
                                                            people.{" "}
                                                            {numPeopleSelSurvey -
                                                                selectedSurvey[key]["Range numbers"]
                                                                    .length >
                                                            0
                                                                ? numPeopleSelSurvey -
                                                                      selectedSurvey[key][
                                                                          "Range numbers"
                                                                      ].length ===
                                                                  1
                                                                    ? numPeopleSelSurvey -
                                                                      selectedSurvey[key][
                                                                          "Range numbers"
                                                                      ].length +
                                                                      " person didn't give it a value."
                                                                    : numPeopleSelSurvey -
                                                                      selectedSurvey[key][
                                                                          "Range numbers"
                                                                      ].length +
                                                                      " people didn't give it a value."
                                                                : ""}
                                                            )
                                                        </code>
                                                    )}
                                                </h5>
                                            </>
                                        )}

                                        {(selectedSurvey[key]["Type of answer"] ===
                                            "Choose 1 answer" ||
                                            selectedSurvey[key]["Type of answer"] ===
                                                "Choose 1+ answers") && (
                                            <>
                                                <li id="questions">
                                                    {selectedSurvey[key].Question}
                                                </li>
                                                {Object.keys(
                                                    selectedSurvey[key].OptionsResults
                                                ).map((optionsKey, idx) => (
                                                    <div key={idx} className="oneAContainer">
                                                        <ul>
                                                            <li
                                                                id="liText"
                                                                className={
                                                                    selectedSurvey[key]
                                                                        .OptionsResults[optionsKey]
                                                                        .higestNum
                                                                        ? "higestNum"
                                                                        : ""
                                                                }
                                                            >
                                                                {
                                                                    selectedSurvey[key]
                                                                        .OptionsResults[optionsKey]
                                                                        .value
                                                                }{" "}
                                                                <span id="numHighestNum">
                                                                    (
                                                                    {
                                                                        selectedSurvey[key]
                                                                            .OptionsResults[
                                                                            optionsKey
                                                                        ].number
                                                                    }
                                                                    /{numPeopleSelSurvey})
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ))}

                                                {showChartInsights && (
                                                    <Bar
                                                        id="chartBar"
                                                        options={{
                                                            legend: {
                                                                display: false
                                                            },
                                                            elements: {
                                                                bar: {
                                                                    borderWidth: 0.5
                                                                }
                                                            },
                                                            indexAxis: "y",
                                                            scale: {
                                                                ticks: {
                                                                    precision: 0
                                                                }
                                                            }
                                                        }}
                                                        data={{
                                                            labels: Object.values(
                                                                selectedSurvey[key]["Chart xValues"]
                                                            ),
                                                            datasets: [
                                                                {
                                                                    label:
                                                                        {
                                                                            numPeopleSelSurvey
                                                                        } === 1
                                                                            ? "vote out of " +
                                                                              numPeopleSelSurvey +
                                                                              " person"
                                                                            : "votes out of " +
                                                                              numPeopleSelSurvey +
                                                                              " people",

                                                                    backgroundColor: function (
                                                                        context
                                                                    ) {
                                                                        const index =
                                                                            context.dataIndex;
                                                                        const value = Object.keys(
                                                                            selectedSurvey[key]
                                                                                .OptionsResults
                                                                        ).map(
                                                                            (optionsKey, idx) =>
                                                                                selectedSurvey[key]
                                                                                    .OptionsResults[
                                                                                    optionsKey
                                                                                ].higestNum
                                                                        )[index];
                                                                        return value
                                                                            ? "rgba(0, 255, 0, 0.25)"
                                                                            : "rgba(94, 94, 94, 0.1)";
                                                                    },
                                                                    data: Object.keys(
                                                                        selectedSurvey[key]
                                                                            .OptionsResults
                                                                    ).map(
                                                                        (optionsKey, idx) =>
                                                                            selectedSurvey[key]
                                                                                .OptionsResults[
                                                                                optionsKey
                                                                            ].number
                                                                    )
                                                                }
                                                            ]
                                                        }}
                                                    />
                                                )}
                                            </>
                                        )}

                                        {selectedSurvey[key]["Type of answer"] === "Text" && (
                                            <>
                                                <li id="questions">
                                                    {selectedSurvey[key].Question}
                                                </li>

                                                {surveyComments.map((surveyComments, index) => (
                                                    <div key={index}>
                                                        {
                                                            <ul id="ulComments">
                                                                <li
                                                                    id="liText"
                                                                    style={{
                                                                        listStyleType: "none",
                                                                        transform:
                                                                            "translateX(-15px)"
                                                                    }}
                                                                >
                                                                    <small>{index + 1}. “</small>{" "}
                                                                    {surveyComments
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        surveyComments.slice(
                                                                            1
                                                                        )}{" "}
                                                                    <small>”</small>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                ))}
                        </ol>
                        {!selectedSurveyBool && (
                            <>
                                <h1 className="chooseAnotherS">
                                    <b className="selectedTitleParentesis chooseAnotherS">◎</b>{" "}
                                    <b className="selectedTitleParentesis chooseAnotherS">◉</b>{" "}
                                    &emsp;&emsp;
                                    <b className="selectedTitleParentesis chooseAnotherS">◎</b>{" "}
                                    <b className="selectedTitleParentesis chooseAnotherS">◉</b>
                                </h1>
                                <div
                                    className="titleContainer chooseAnotherSurvey"
                                    id="chooseTitle"
                                >
                                    <h3>Choose another Survey:</h3>
                                    <select
                                        id="chooseList"
                                        name="survey titles"
                                        defaultValue={"DEFAULT"}
                                        onChange={(e) => {
                                            if (e.target.value !== selectedTitle) {
                                                setSelectedSurveyBool(true);
                                                setSelectedTitle(e.target.value);
                                            }
                                        }}
                                    >
                                        <option value="DEFAULT" disabled hidden>
                                            Choose one from the list..
                                        </option>
                                        {surveyTitles.map((title, index) => (
                                            <option key={index} value={title.title + title.id}>
                                                {title.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="surveyContainer">
                        <h1 id="noSurveyet">It seems you haven't created any Survey yet..</h1>
                        <img src="/emptyTray.png" alt="empty" id="emptyTray" />
                        <h3 id="noSurveyet">
                            <b
                                className={
                                    selectedTitle && numPeopleSelSurvey
                                        ? "selectedTitleParentesis"
                                        : " stp1"
                                }
                            >
                                ◎
                            </b>{" "}
                            Surveys archive is empty{" "}
                            <b
                                className={
                                    selectedTitle && numPeopleSelSurvey
                                        ? "selectedTitleParentesis"
                                        : " stp1"
                                }
                            >
                                ◎
                            </b>
                        </h3>
                    </div>
                )}
            </section>
            <CreatorButtonsNavigate />
        </>
    );
}

export default CreatorResults;
