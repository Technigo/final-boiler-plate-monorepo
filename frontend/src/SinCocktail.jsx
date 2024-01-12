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
                        {cocktail.imageUrl && (
                            <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Primary Liquor: {cocktail.primaryLiquor}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Ingredients: {cocktail.ingredients.join(', ')}
                        </Text>

                        <div>
                            <Text type="H2" className={styles.h2}>
                                Ingredients:
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
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Difficulty: {cocktail.difficulty}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Instructions: {cocktail.instructions}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Category: {cocktail.category}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Occasions: {cocktail.occasion.join(', ')}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Creator: {cocktail.creator}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Servings: {cocktail.servings}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Prep Time: {cocktail.prepTime}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Description: {cocktail.description}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Strength: {cocktail.strength}
                        </Text>
                    </div>
                ) : (
                    <p>Loading cocktail details...</p>
                )}
            </div>
        </div>
    );
};

