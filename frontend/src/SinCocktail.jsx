import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./SinCocktail.module.css";
import { Text } from './UI/Typography';

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
                        {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
                        {cocktail.imageUrl && (
                            <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        {/* **** Servings ****** */}
                        <Text type="SbodyText" className={styles.SbodyText} style={{ textAlign: 'center' }}>
                            <span className={styles.numberSquare}>{cocktail.servings}</span> Serving
                        </Text>
                        {/* **** Icons ****** */}
                        <Text
                            type="bodyText"
                            className={styles.bodyText}
                            style={{ marginTop: '30px', padding: '0px 32px', fontWeight: '300' }} >
                            ⏲️: {cocktail.prepTime} | 🌟: {cocktail.difficulty}
                        </Text>
                        <Text
                            type="bodyText"
                            className={styles.bodyText}
                            style={{ marginBottom: '20px', padding: '0px 32px', fontWeight: '300' }}>
                            ⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}
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
                            style={{ marginTop: '20px' }}>
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

                    </div>
                ) : (
                    <p>Loading cocktail details...</p>
                )}
            </div>
        </div>
    );
};

