import styles from './Cocktails.module.css';
import { Text } from '../UI/Typography';
import React, { useState, useEffect } from 'react';

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch('https://cbc-uvko.onrender.com/cocktails')
            .then(response => response.json())
            .then(data => {
                const recentCocktails = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
                setCocktails(recentCocktails);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            <Text type="H1" className={styles.h1}>LATEST COCKTAILS</Text>
            {cocktails.map(cocktail => (
                <div key={cocktail._id}>
                    {cocktail.imageUrl && (
                        <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                    )}
                    <h2>{cocktail.name}</h2>
                    <p>Primary Liquor: {cocktail.primaryLiquor}</p>
                    <p>Ingredients: {cocktail.ingredients.join(', ')}</p>
                    <p>Ingredients Count: {cocktail.ingredientsCount}</p>
                    <p>Difficulty: {cocktail.difficulty}</p>
                    <p>Instructions: {cocktail.instructions}</p>
                    <p>Category: {cocktail.category}</p>
                    <p>Occasions: {cocktail.occasion.join(', ')}</p>
                    <p>Creator: {cocktail.creator}</p>
                    <p>Servings: {cocktail.servings}</p>
                    <p>Prep Time: {cocktail.prepTime}</p>
                    <p>Description: {cocktail.description}</p>
                    <p>Strength: {cocktail.strength}</p>
                </div>
            ))}
        </div>
    );
};
