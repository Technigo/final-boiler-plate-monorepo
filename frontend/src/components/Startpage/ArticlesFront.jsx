import React from 'react';
import { useTranslation } from 'react-i18next';
import data from "../../data/articles.json";
import "./articlesfront.css";
import { Link } from 'react-router-dom';

const ArticlesFront = () => {

    const { t } = useTranslation();

    return (
        <div className='articles-front'>
            <h2>{t("Articles")}</h2>
            <div className='articles-display'>
                {/* Map through articles and create Link components */}
                {data.articles.map((article, index) => (
                    // Wrap the article content in a Link component with the desired destination path
                    <Link key={index} to="/articles">
                        <div>
                            <img src={article.imageM} alt={article.name} />
                            <h3>{article.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ArticlesFront;
