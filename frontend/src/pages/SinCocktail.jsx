import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./SinCocktail.module.css";
import { Text } from '../UI/Typography';
import { BackButton } from '../UI/BackToButton';

export const SinCocktail = () => {
    const [cocktail, setCocktail] = useState(null);
    const { id } = useParams(); // Extract the id from the URL (this was wrong yesterday)

    useEffect(() => {
        fetch(`https://cbc-uvko.onrender.com/cocktails/${id}`)
            .then(response => response.json())
            .then(data => setCocktail(data))
            .catch(error => console.error('Error fetching cocktail:', error));
    }, [id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.gridContainer}>
                {cocktail ? (
                    <div key={cocktail._id}>
                        {cocktail.name && <Text type="H1" className={styles.h1}>{cocktail.name}</Text>}
                        {cocktail.imageUrl && (
                            <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        {/* **** Servings ****** */}
                        <Text type="bodyText" className={styles.bodyText} style={{ textAlign: 'center' }}>
                            <span className={styles.numberSquare}>{cocktail.servings}</span> Serving
                        </Text>
                        {/* **** Icons ****** */}
                        <Text type="SbodyText" className={styles.SbodyTextTop}>
                            <img src="/images/time-icon.png" alt="Prep Time" className={styles.icon} /> {cocktail.prepTime}
                            <img src="/images/brain.png" alt="Prep Time" className={styles.icon2} /> {cocktail.difficulty}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyTextTop}>
                            <img src="/images/percent.png" alt="Prep Time" className={styles.icon} /> {cocktail.strength}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyTextTag}>
                            <img src="/images/tag.png" alt="Prep Time" className={styles.icon} /> {cocktail.tags.join(', ')}
                        </Text>
                        {/* **** Ingredients ****** */}
                        <div>
                            <Text type="H2" className={styles.h2}>
                                Ingredients
                            </Text>
                            <ul>
                                {cocktail.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        <Text type="SbodyText" className={styles.SbodyText}>
                                            {ingredient}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* **** Instructions ****** */}
                        <Text type="H2" className={styles.h2}>
                            Instructions
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            {cocktail.instructions}
                        </Text>
                        {/* **** Description ****** */}
                        <Text type="H2" className={styles.h2}>
                            Description
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            {cocktail.description}
                        </Text>
                        {/* **** About ****** */}
                        <Text
                            type="XSbodyText"
                            className={styles.SbodyText}
                            style={{ marginTop: '30px' }}>
                            Created by {cocktail.creator}
                        </Text>
                        <Text
                            type="XSbodyText"
                            className={styles.SbodyText}>
                            {cocktail.category}
                        </Text>
                        <Text
                            type="XSbodyText"
                            className={styles.SbodyText}
                            style={{ marginBottom: '50px' }}>
                            Occasions: {cocktail.occasion.join(', ')}
                        </Text>
                        <div className={styles.BackToButton}>
                            <BackButton />
                        </div>
                    </div>
                ) : (
                    <Text type="H3" className={styles.h3Load}>LOADING COCKTAIL DETAILS</Text>
                )}
            </div>
        </div >
    );
};

