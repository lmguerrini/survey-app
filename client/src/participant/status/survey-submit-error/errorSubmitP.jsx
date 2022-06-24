import "./errorSubmitP.css";

function ErrorSubmit() {
    return (
        <div className="errorSubmitContainer">
            <span>
                Ops, it seems you haven't answered any questions.
                <br /> Please submit at least one.{" "}
            </span>
        </div>
    );
}

export default ErrorSubmit;
