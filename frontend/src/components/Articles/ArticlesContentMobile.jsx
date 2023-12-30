// ArticlesContent.jsx
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import data from "../../data/articles.json";
import "./articlescontentmobile.css";

const ArticlesContentMobile = () => {
    // State to track which article is currently expanded
    const [expandedArticle, setExpandedArticle] = useState(null);

    // State to store the articles data
    const [articles, setArticles] = useState(data.articles);

    const handleArticleClick = (articleId) => {
        // Set the clicked article's id as the expanded article
        setExpandedArticle((prev) => (prev === articleId ? null : articleId));
    };

    const { t } = useTranslation();

    return (
        <div className="articlesmobile-container">
            <h2>{t("Articles")}</h2>
            <p>
                {t("Discover a variety of articles about habits. From understanding the science behind habit formation to practical tips for positive changes, our collection offers valuable insights for cultivating a healthier and more productive lifestyle.")}
            </p>
            <hr />

            {articles.map((article) => (
                <div key={article.id} className={`articlemobile-summary ${article.isReverse ? "reverse" : ""} ${expandedArticle === article.id ? "expanded" : ""}`}>
                    <div
                        className={`articlemobile-info ${expandedArticle === article.id ? "expanded" : ""}`}
                        onClick={() => handleArticleClick(article.id)}
                    >
                        <img
                            src={expandedArticle === article.id ? article.imageL : article.imageL}
                            alt={article.name}
                            style={{ maxWidth: expandedArticle === article.id ? "320px" : "320px" }}
                        />
                        <div className="articlemobile-text">
                            <h3>{t(article.name)}</h3>
                            {expandedArticle === article.id ? (
                                <>
                                    <p className="mobiledate">{article.date}</p>
                                    <p>{t(article.text)}</p>
                                    <hr />
                                </>
                            ) : (
                                <>
                                    <p className="articlemobile-info">{t(article.info)}</p>
                                    <p className="mobilereadmore">{t(article.readmore)}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlesContentMobile;
