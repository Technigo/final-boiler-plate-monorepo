

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./SinCocktail.module.css";
import { Text } from './UI/Typography';

export const SinCocktail = () => {
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        // Fetch cocktail details using the `match.params.id` from the URL
        const cocktailId = match.params.id;

        // Replace this with your actual fetch logic to get the details of the specific cocktail
        fetch(`https://your-api-url.com/cocktails/${cocktailId}`)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(data); // Set the cocktail details in state
            })
            .catch((error) => {
                console.error('Error fetching cocktail details:', error);
            });
    }, [match.params.id]);

    return (
        <div className={styles.wrapper}>
            <Text type="SbodyText" className={styles.SbodyText}>COCKTAIL DETAILS</Text>
            <div className={styles.gridContainer}>
                {cocktail ? (
                    <div key={cocktail._id}>
                        {/* {cocktail.imageUrl && (
                            <img
                                src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`}
                                alt={cocktail.name}
                                className={styles.cocktailImage}
                            />
                        )} */}
                        <Text type="H3" className={styles.h3}>
                            {cocktail.name}
                        </Text>
                        {/* <Text type="SbodyText" className={styles.SbodyText}>
                            Primary Liquor: {cocktail.primaryLiquor}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Ingredients: {cocktail.ingredients.join(', ')}
                        </Text>
                        <Text type="SbodyText" className={styles.SbodyText}>
                            Ingredients Count: {cocktail.ingredientsCount}
                        </Text>
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
                        </Text> */}
                    </div>
                ) : (
                    <p>Loading cocktail details...</p>
                )}
            </div>
        </div>
    );
};

