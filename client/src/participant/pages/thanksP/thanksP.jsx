import Header from "../../components/headerP/headerP";
import ButtonsNavigate from "../../components/buttonsP/buttonsNavigateP";
import "./thanksP.css";

function ParticipantThanks() {
    return (
        <>
            <Header />
            <section>
                <div className="surveyContainer">
                    <h1>Thank you,</h1>
                    <h2>
                        Your survey responses have been submitted successfully!
                    </h2>
                    <img
                        className="sucessSurveyCgif sucessSurveyPgif"
                        src="/sucessSurveyC.gif"
                        alt="success"
                    />
                    <p>You can now close this page</p>
                </div>
            </section>
            <ButtonsNavigate />
        </>
    );
}

export default ParticipantThanks;
