import React from "react";
import { useTranslation } from 'react-i18next';
import "./howitworks.css";

const HowItWorks = () => {

    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("How it works")}</h1>
            <p>{t("Not finnished yet")}</p>
        </div>

    );
};

export default HowItWorks; 