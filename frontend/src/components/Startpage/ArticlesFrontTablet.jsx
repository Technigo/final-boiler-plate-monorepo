import React from 'react';
import { useTranslation } from 'react-i18next';
import data from "../../data/articles.json";
import "./articlesfronttablet.css";
import { Link } from 'react-router-dom';

const ArticlesFrontTablet = () => {

    const { t } = useTranslation();

    return (
        <div className='articles-fronttablet'>
            <h2>{t("Articles")}</h2>
            <div>
                {/* Map through articles and create Link components */}
                {data.articles.map((article, index) => (
                    // Wrap the article content in a Link component with the desired destination path
                    <Link key={index} to="/articles">
                        <div className='articles-displaytablet'>
                            <img src={article.imageL} alt={article.name} />
                            <h3>{t(article.name)}</h3>
                            <p>{t(article.readmore)}</p>
                            <hr />
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
};

export default ArticlesFrontTablet;
