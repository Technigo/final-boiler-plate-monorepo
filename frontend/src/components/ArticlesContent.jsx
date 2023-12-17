import React, { useState } from "react";
import data from "../data/articles.json";
import "./css/articlescontent.css";

const ArticlesContent = () => {
    // State to track which article is currently expanded
    const [expandedArticle, setExpandedArticle] = useState(null);

    // State to store the articles data
    const [articles, setArticles] = useState(data.articles);

    const handleArticleClick = (articleId) => {
        // Set the clicked article's id as the expanded article
        setExpandedArticle(articleId === expandedArticle ? null : articleId);
    };

    return (
        <div className="articles-container">
            <h2>Articles</h2>
            <p>Discover a variety of articles about habits. From understanding the science behind habit formation to practical tips for positive changes, our collection offers valuable insights for cultivating a healthier and more productive lifestyle.</p>
            <hr></hr>

            {articles.map((article) => (

                <div className="article-info">
                    <div
                        key={article.id}
                        className={`article-summary ${expandedArticle === article.id ? "expanded" : ""}`}
                        onClick={() => handleArticleClick(article.id)}
                    >

                        <img
                            src={expandedArticle === article.id ? article.imageL : article.imageS}
                            alt={article.name}
                            style={{ maxWidth: expandedArticle === article.id ? "600px" : "300px" }}
                        />

                        <h3>{article.name}</h3>
                        <p>{expandedArticle === article.id ? article.date : article.info}</p>
                        {expandedArticle === article.id && (
                            <>
                                <p>{article.text}</p>
                                <p>{article.date}</p>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlesContent;
