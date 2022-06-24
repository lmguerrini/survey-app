import "./headerP.css";
import { useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ParticipantHeader() {
    const { pathname } = useLocation();
    const [surveyTitle, setSurveyTitle] = useState();

    useEffect(() => {
        axios
            .get(`/api/participant/welcome/${pathname.replace(/[^0-9]/g, "")}`)
            .then(({ data }) => {
                setSurveyTitle(data.surveyTitle);
            })
            .catch((error) => {
                console.log("error", error);
            });
    });

    return (
        <>
            <header
                className={
                    pathname ===
                    `/participant/welcome/${pathname.replace(/[^0-9]/g, "")}`
                        ? "headerWelcome"
                        : "headerSurvey"
                }
            >
                <img
                    src={
                        pathname ===
                        `/participant/welcome/${pathname.replace(
                            /[^0-9]/g,
                            ""
                        )}`
                            ? "/logo.png"
                            : "/logoSurvey.png"
                    }
                    className={
                        pathname ===
                        `/participant/welcome/${pathname.replace(
                            /[^0-9]/g,
                            ""
                        )}`
                            ? "imgWelcome"
                            : "imgSurvey"
                    }
                    alt="logo"
                />
                <h1
                    className={
                        pathname ===
                        `/participant/welcome/${pathname.replace(
                            /[^0-9]/g,
                            ""
                        )}`
                            ? "titleWelcome"
                            : "titleWelcome titleSurvey"
                    }
                >
                    {surveyTitle}
                </h1>
            </header>
        </>
    );
}

export default ParticipantHeader;
