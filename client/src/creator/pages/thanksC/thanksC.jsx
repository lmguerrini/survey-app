import "./thanksC.css";
import React, { useState } from "react";
import { useLocation } from "react-router";
import CreatorHeader from "../../components/headerC/headerC";
import CreatorButtonsNavigate from "../../components/buttonsC/buttonsNavigateC";
import { AiOutlineLink } from "react-icons/ai";

function CreatorThanks() {
    const { pathname } = useLocation();
    console.log("THANKS pathname", pathname.replace(/[^0-9]/g, ""));

    const [copyToClipBoard, setCopyToClipBoard] = useState(false);
    // const [shareableLink, setShareableLink] = useState();
    // setShareableLink("/participant/welcome/" + pathname.replace(/[^0-9]/g, ""));
    const shareableLink =
        "http://localhost:3000/participant/welcome/" + pathname.replace(/[^0-9]/g, "");
    console.log("THANKS shareableLink", shareableLink);
    return (
        <>
            {" "}
            <CreatorHeader />
            <section>
                <div className="surveyContainer">
                    <h1>Your new Survey has just been successfully created!</h1>
                    <img
                        className="sucessSurveyCgif"
                        src="/sucessSurveyC.gif"
                        alt="success"
                    />
                    <h3>
                        This is the shareable link for participants to take this
                        Survey:
                    </h3>
                    <div className="shareableLinkContainer">
                        <AiOutlineLink
                            id="copyShareableLink"
                            title="copy shareable link"
                            onClick={() => {
                                navigator.clipboard.writeText(shareableLink);
                                setCopyToClipBoard(true);
                                setTimeout(
                                    () => setCopyToClipBoard(false),
                                    3000
                                );
                            }}
                        />
                        <a href={shareableLink}>Open sharable link</a>{" "}
                    </div>
                    {copyToClipBoard && (
                        <p>
                            The sharable link has been copied to the ClipBoard
                            successfully!
                        </p>
                    )}
                </div>
            </section>
            <CreatorButtonsNavigate />
        </>
    );
}

export default CreatorThanks;
