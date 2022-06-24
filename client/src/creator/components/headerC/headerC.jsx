import "./headerC.css";
import { useLocation } from "react-router";

function CreatorHeader() {
    const { pathname } = useLocation();
    // console.log("pathname", pathname);
    return (
        <>
            <header
                className={pathname === "/" ? "headerWelcome" : "headerSurvey"}
            >
                <img
                    src={pathname === "/" ? "/logoC.png" : "/logoSurveyC.png"}
                    className={pathname === "/" ? "imgWelcome" : "imgSurvey"}
                    alt="logo"
                />
                <h1
                    className={
                        pathname === "/"
                            ? "titleWelcome"
                            : "titleWelcome titleSurvey"
                    }
                >
                    Creator Survey App_
                </h1>
                {pathname === "/" && (
                    <h5 className="descriptionWelcome">
                        Welcome to the Creator Survey App_ <br />
                        Here you can <i>create</i> your customized new Survey,{" "}
                        <br />
                        or see the <i>results</i> of already created ones.
                    </h5>
                )}
            </header>
        </>
    );
}

export default CreatorHeader;
