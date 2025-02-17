import React from "react";
import Header from "../components/Header";
import mockPostData from "../mocks/mockPostData.json";
import FloatingThemeButton from "../hooks/switch";
import PageDetail from "../components/PageDetail";

const Pages: React.FC = () => {
    const program = mockPostData.program;

    return (
        <>
            <Header />
            <div className="!mx-auto max-w-[98%] lg:max-w-[90%]">
                <PageDetail program={program} />
            </div>
            <FloatingThemeButton />
        </>
    );
};

export default Pages;