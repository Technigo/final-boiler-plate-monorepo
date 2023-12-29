// ArticlesContent.jsx
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import data from "../../data/articles.json";
import "./articlescontent.css";

const ArticlesContent = () => {
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
        <div className="articles-container">
            <h2>{t("Articles")}</h2>
            <p>
                {t("Discover a variety of articles about habits. From understanding the science behind habit formation to practical tips for positive changes, our collection offers valuable insights for cultivating a healthier and more productive lifestyle.")}
            </p>
            <hr />

            {articles.map((article) => (
                <div key={article.id} className={`article-summary ${article.isReverse ? "reverse" : ""} ${expandedArticle === article.id ? "expanded" : ""} ${article.id === 2 ? "middle-article" : ""}`}>
                    <div
                        className={`article-info ${expandedArticle === article.id ? "expanded" : ""}`}
                        onClick={() => handleArticleClick(article.id)}
                    >
                        <img
                            src={expandedArticle === article.id ? article.imageL : article.imageS}
                            alt={article.name}
                            style={{ maxWidth: expandedArticle === article.id ? "800px" : "350px" }}
                        />
                        <div className="article-text">
                            <h3>{article.name}</h3>
                            {expandedArticle === article.id ? (
                                <>
                                    <p className="date">{article.date}</p>
                                    <p>{article.text}</p>
                                    <hr />
                                </>
                            ) : (
                                <>
                                    <p className="article-info">{article.info}</p>
                                    <p className="readmore">{article.readmore}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlesContent;
