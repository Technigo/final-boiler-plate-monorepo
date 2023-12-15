import React from 'react';
import data from "../data/articles.json";
import "./css/articlesfront.css";

const ArticlesFront = () => {
    return (
        <div className='articles-front'>
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
