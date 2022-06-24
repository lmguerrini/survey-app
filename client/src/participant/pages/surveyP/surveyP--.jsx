import Header from "../../components/headerP/headerP";
import ButtonsNavigate from "../../components/buttonsP/buttonsNavigateP";
import ErrorSubmit from "../../status/survey-submit-error/errorSubmitP";
import "./surveyP.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ParticipantSurvey() {
    // answers
    // const [a1, setA1] = useState();
    // const [a2, setA2] = useState();
    // const [a3, setA3] = useState([]);
    const [a3Values, setA3Values] = useState([]);
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
            } else if (e.target.name.startsWith("a3")) {
                setA3Values([...a3Values, e.target.value]);
                return {
                    ...prevValues,
                    a3: [...a3Values, e.target.value],
                };
            } else {
                return { ...prevValues, [e.target.name]: e.target.value };
            }
        });
    };

    useEffect(() => {
        axios
            .get("/api/survey-results")
            .then(({ data }) =>
                console.log(
                    "FE api/survey-answers DATA :",
                    data.results,
                    errorSubmit
                )
            )
            .catch((err) => console.log(err));
    });

    // const [a4, setA4] = useState();
    // const [a5, setA5] = useState();
    // const [a6, setA6] = useState();
    // const [a7, setA7] = useState();
    // const [a8, set83] = useState();
    // const [a9, setA9] = useState();
    // const [a10, setA10] = useState();
    // let totalQ = [];
    // let filteredTotalQ = [];
    // const handleChangeA1 = (e) => {
    //     setA1(Number(e.target.value));
    //     console.log("a1 :", a1);
    // };
    // const handleChangeA2 = (e) => {
    //     setA2(e.target.value);
    // };
    // const handleChangeA3 = (e) => {
    //     console.log("range :", e.target.value, e.target.name);

    //     a3.push(e.target.value);
    // };
    // if (a1 || a2 || a3.length > 0) {
    //     totalQ.push({ a1: a1 }, { a2: a2 }, { a3: a3 });
    //     filteredTotalQ = totalQ.filter((obj) => {
    //         if (totalQ.length > 0) {
    //             for (let i = 0; i < totalQ.length; i++) {
    //                 for (var key in obj) {
    //                     if (Array.isArray(obj[key])) {
    //                         // handling multiple answers
    //                         return obj[key].length > 0;
    //                     }
    //                     return obj[key] !== undefined;
    //                 }
    //             }
    //         }
    //         return false;
    //     });
    // }

    return (
        <>
            <Header />
            <section>
                <div className="surveyContainer">
                    <h1>Customer Satisfaction Survey</h1>
                    <ol>
                        <li>
                            How likely is it that you would recommend this
                            company to a friend or colleague?
                        </li>
                        <div className="rangeContainer">
                            <span>not at all likely</span>
                            <span>extremely likely</span>
                        </div>
                        <input
                            id="range"
                            type="range"
                            min="0"
                            max="10"
                            name="a1"
                            // value={a1}
                            step="1"
                            // onChange={(e) => setA1(Number(e.target.value))}
                            onChange={(e) => changeHandler(e)}
                        />
                        
                        <li>
                            Overall, how satisfied or dissatisfied are you with
                            our company?
                        </li>
                        <input
                            type="radio"
                            // name="satisfaction"
                            name="a2"
                            value="Very satisfied"
                            // onChange={handleChangeA2}
                            // onChange={(e) => setA2(e.target.value)}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very satisfied
                        <br />
                        <input
                            type="radio"
                            name="a2"
                            value="Somewhat satisfied"
                            // onChange={handleChangeA2}
                            // onChange={(e) => setA2(e.target.value)}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Somewhat satisfied
                        <br />
                        <input
                            type="radio"
                            name="a2"
                            value="Neither satisfied nor dissatisfied"
                            // onChange={handleChangeA2}
                            // onChange={(e) => setA2(e.target.value)}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Neither satisfied nor dissatisfied
                        <br />
                        <input
                            type="radio"
                            name="a2"
                            value="Somewhat dissatisfied"
                            // onChange={handleChangeA2}
                            // onChange={(e) => setA2(e.target.value)}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Somewhat dissatisfied
                        <br />
                        <input
                            type="radio"
                            name="a2"
                            value="Very dissatisfied"
                            // onChange={handleChangeA2}
                            // onChange={(e) => setA2(e.target.value)}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very dissatisfied
                        <li>
                            Which of the following words would you use to
                            describe our products? Select all that apply.
                        </li>
                        <input
                            type="radio"
                            // name="high-quality"
                            name="a3-1"
                            value="High quality"
                            // onChange={handleChangeA3}
                            // onChange={(e) => setA3([...a3, e.target.value])}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        High quality
                        <br />
                        <input
                            type="radio"
                            // name="useful"
                            name="a3-2"
                            value="Useful"
                            // onChange={handleChangeA3}
                            // onChange={(e) => setA3([...a3, e.target.value])}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Useful
                        <br />
                        <input
                            type="radio"
                            // name="good-value-for-money"
                            name="a3-3"
                            value="Good value for money"
                            // onChange={handleChangeA3}
                            // onChange={(e) => setA3([...a3, e.target.value])}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Good value for money
                        <br />
                        <input
                            type="radio"
                            // name="unreliable"
                            name="a3-4"
                            value="Unreliable"
                            // onChange={handleChangeA3}
                            // onChange={(e) => setA3([...a3, e.target.value])}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Unreliable
                        <br />
                        <input
                            type="radio"
                            // name="poor-quality"
                            name="a3-5"
                            value="Poor quality"
                            // onChange={handleChangeA3}
                            // onChange={(e) => setA3([...a3, e.target.value])}
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Poor quality
                        <li>How well do our products meet your needs?</li>
                        <input
                            type="radio"
                            // name="expectation"
                            name="a4"
                            value="Extremely well"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Extremely well
                        <br />
                        <input
                            type="radio"
                            name="a4"
                            value="Very well"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very well
                        <br />
                        <input
                            type="radio"
                            name="a4"
                            value="Somewhat well"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Somewhat well
                        <br />
                        <input
                            type="radio"
                            name="a4"
                            value="Not so well"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Not so well
                        <br />
                        <input
                            type="radio"
                            name="a4"
                            value="Not at all well"
                        />{" "}
                        Not at all well
                        <li>How would you rate the quality of the product?</li>
                        <input
                            type="radio"
                            // name="quality"
                            name="a5"
                            value="Very high quality"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very high quality
                        <br />
                        <input
                            type="radio"
                            name="a5"
                            value="High quality"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        High quality
                        <br />
                        <input
                            type="radio"
                            name="a5"
                            value="Neither high nor low quality"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Neither high nor low quality
                        <br />
                        <input
                            type="radio"
                            name="a5"
                            value="Low quality"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Low quality
                        <br />
                        <input
                            type="radio"
                            name="a5"
                            value="Very low quality"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very low quality
                        <li>
                            How would you rate the value for money of the
                            product?
                        </li>
                        <input
                            type="radio"
                            // name="value"
                            name="a6"
                            value="Excellent"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Excellent
                        <br />
                        <input
                            type="radio"
                            name="a6"
                            value="Above average"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Above average
                        <br />
                        <input
                            type="radio"
                            name="a6"
                            value="Average"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Average
                        <br />
                        <input
                            type="radio"
                            name="a6"
                            value="Below average"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Below average
                        <br />
                        <input
                            type="radio"
                            name="a6"
                            value="Poor"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Poor
                        <li>
                            How responsive have we been to your questions or
                            concerns about our products?
                        </li>
                        <input
                            type="radio"
                            // name="responsiveness"
                            name="a7"
                            value="Extremely responsive"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Extremely responsive
                        <br />
                        <input
                            type="radio"
                            name="a7"
                            value="Very responsive"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very responsive
                        <br />
                        <input
                            type="radio"
                            name="a7"
                            value="Somewhat responsive"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Somewhat responsive
                        <br />
                        <input
                            type="radio"
                            name="a7"
                            value="Not so responsive"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Not so responsive
                        <br />
                        <input
                            type="radio"
                            name="a7"
                            value="Not at all responsive"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Not at all responsive
                        <li>
                            How long have you been a customer of our company?
                        </li>
                        <input
                            type="radio"
                            // name="customer"
                            name="a8"
                            value="This is my first purchase"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        This is my first purchase
                        <br />
                        <input
                            type="radio"
                            name="a8"
                            value="Less than six months"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Less than six months
                        <br />
                        <input
                            type="radio"
                            name="a8"
                            value="Six months to a year"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Six months to a year
                        <br />
                        <input
                            type="radio"
                            name="a8"
                            value="1-2 years"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        1-2 years
                        <br />
                        <input
                            type="radio"
                            name="a8"
                            value="3 or more years"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        3 or more years
                        <li>
                            How likley are you to purchase any of our products
                            again?
                        </li>
                        <input
                            type="radio"
                            // name="purchase"
                            name="a9"
                            value="Extremely likely"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Extremely likely
                        <br />
                        <input
                            type="radio"
                            name="a9"
                            value="Very likely"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Very likely
                        <br />
                        <input
                            type="radio"
                            name="a9"
                            value="Somewhat likely"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Somewhat likely
                        <br />
                        <input
                            type="radio"
                            name="a9"
                            value="Not so likely"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Not so likely
                        <br />
                        <input
                            type="radio"
                            name="a9"
                            value="Not at all likely"
                            onChange={(e) => changeHandler(e)}
                        />{" "}
                        Not at all likely
                        <li>
                            Do you have any other comments, questions, or
                            concerns?
                        </li>
                        <textarea
                            name="a10"
                            rows="4"
                            cols="50"
                            onChange={(e) => changeHandler(e)}
                        />
                    </ol>
                </div>
            </section>
            {/* <ButtonsNavigate propsFromSurvey={{ filteredTotalQ }} /> */}
            {errorSubmit && <ErrorSubmit />}
            <ButtonsNavigate
                propsFromSurvey={allAnswers}
                setErrorSubmit={setErrorSubmit}
            />
        </>
    );
}

export default ParticipantSurvey;
