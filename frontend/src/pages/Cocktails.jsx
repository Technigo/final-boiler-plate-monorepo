import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //for SinCoctail (had troubble yesterday and moved sinCocktails from pages to src)
import styles from './Cocktails.module.css';
import { Text } from '../UI/Typography';

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([]);
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [itemsToDisplay, setItemsToDisplay] = useState(6); // Initial number of cocktails to display on Cocktails
    const [totalCocktails, setTotalCocktails] = useState(0);

    const filters = {
        'Occasion': ['Summer', 'Christmas', 'Fall', 'Spring', 'Halloween'],
        'Main Liquor': ['Gin', 'Tequila', 'Vermouth']
    };

    useEffect(() => {
        let query = '';
        if (searchTerm) {
            query += `search=${encodeURIComponent(searchTerm)}`;
        }
        if (selectedFilter) {
            query += (query ? '&' : '') + `category=${encodeURIComponent(selectedFilter)}`;
        }

        fetch(`https://cbc-uvko.onrender.com/cocktails${query ? '?' + query : ''}`)
            .then(response => response.json())
            .then(data => {
                setCocktails(data);
                setDisplayedCocktails(data.slice(0, itemsToDisplay));
                setTotalCocktails(data.length); // Update total number of cocktails
            })
            .catch(error => console.error('Error fetching cocktails:', error));
    }, [searchTerm, selectedFilter, itemsToDisplay]);

    const loadMoreCocktails = () => {
        setItemsToDisplay(prev => prev + 6); //show 6 more for each new "load more"
    };

    return (
        <div className={styles.wrapper}>
            {/* Search Input */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search for cocktails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filter Dropdown */}
            <div className={styles.dropdowns}>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="">Select Filter</option>
                    {Object.entries(filters).map(([category, values]) => (
                        <optgroup label={category} key={category}>
                            {values.map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            <Text type="H1" className={styles.h1}>OUR RECENT COCKTAILS</Text>
            <div className={styles.gridContainer}>
                {displayedCocktails.map(cocktail => (
                    // Wrap each cocktail with Link, clickable
                    <Link to={`/cocktail/${cocktail._id}`} key={cocktail._id} className={styles.cocktailLink}>
                        <div>
                            {cocktail.imageUrl && (
                                <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                            )}
                            {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
                            <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                            <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load more btn */}
            {displayedCocktails.length < totalCocktails && (
                <div className={styles.loadMoreButtonContainer}>
                    <button onClick={loadMoreCocktails} className={styles.loadMoreButton}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

