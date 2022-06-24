import "./errorSubmitC.css";

function CreatorErrorSubmit(propsFromButtonsNavigateC) {
    const error = propsFromButtonsNavigateC.error;
    return (
        <div
            className={
                error.length > 0
                    ? "errorSubmitContainer"
                    : "errorSubmitContainer displayNone"
            }
        >
            {error === "1" ? (
                <span>
                    Ops, it seems you have left Question n. {error} incomplete.
                    <br /> Please complete at least one.
                </span>
            ) : (
                <span>
                    Ops, it seems you have left Question n. {error} incomplete.
                    <br /> Please complete or just delete the empty one(s).
                </span>
            )}
        </div>
    );
}

export default CreatorErrorSubmit;
