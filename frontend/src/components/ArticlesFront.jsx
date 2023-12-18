import React from 'react';
import { useTranslation } from 'react-i18next';
import data from "../data/articles.json";
import "./css/articlesfront.css";

const ArticlesFront = () => {

    const { t } = useTranslation();

    return (
        <div className='articles-front'>
            <h2>{t("Articles")}</h2>
            <div className='articles-display'>
                {data.articles.map((article, index) => (
                    <div key={index}>
                        <img src={article.imageM} alt={article.name} />
                        <h3>{article.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticlesFront;
