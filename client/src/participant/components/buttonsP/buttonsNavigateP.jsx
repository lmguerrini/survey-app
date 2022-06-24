import "./buttonsNavigateP.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";

function ParticipantButtonsNavigate(props) {
    const { propsFromSurvey } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handleSubmit = (e) => {
        // handling error (if no answers)
        if (Object.keys(propsFromSurvey).length === 0) {
            props.setErrorSubmit(true);
        } else {
            console.log("allAnswer-- :", propsFromSurvey);
            axios
                .post("/api/participant/survey-answers", {
                    surveyId: Number(pathname.replace(/[^0-9]/g, "")),
                    allAnswers: propsFromSurvey,
                })
                .then(({ data }) => {
                    console.log("FE-post post participant", data);
                    // navigate("/participant/thanks");
                    navigate(
                        `/participant/thanks/${pathname.replace(/[^0-9]/g, "")}`
                    );
                    // location.replace("/");
                    // localStorage.clear();
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }

        // navigate("/thanks");
    };

    return (
        <>
            {pathname ===
                `/participant/welcome/${pathname.replace(/[^0-9]/g, "")}` && (
                <button
                    id="buttonWelcome"
                    onClick={() =>
                        navigate(
                            `/participant/survey/${pathname.replace(
                                /[^0-9]/g,
                                ""
                            )}`
                        )
                    }
                >
                    Start Survey
                </button>
            )}
            {pathname ===
                `/participant/survey/${pathname.replace(/[^0-9]/g, "")}` && (
                <>
                    <button
                        onClick={() =>
                            navigate(
                                `/participant/welcome/${pathname.replace(
                                    /[^0-9]/g,
                                    ""
                                )}`
                            )
                        }
                    >
                        Back
                    </button>
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </>
            )}
            {pathname ===
                `/participant/thanks/${pathname.replace(/[^0-9]/g, "")}` && (
                <>
                    {/* <button onClick={(e) => navigate("/results")}>
                        see results
                    </button> */}
                    {/* <button onClick={() => navigate("/survey")}>back</button> */}
                    <button
                        onClick={() =>
                            navigate(
                                `/participant/welcome/${pathname.replace(
                                    /[^0-9]/g,
                                    ""
                                )}`
                            )
                        }
                    >
                        Redo Survey
                    </button>
                    {/* <button>see results</button> */}
                </>
            )}
        </>
    );
}

export default ParticipantButtonsNavigate;
