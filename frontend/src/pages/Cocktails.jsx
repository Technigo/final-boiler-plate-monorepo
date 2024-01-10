import React, { useState, useEffect } from 'react';
import styles from './Cocktails.module.css';
import { Text } from '../UI/Typography';


export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

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
                // Display only the last 6 cocktails if no filters are applied
                setCocktails((!searchTerm && !selectedFilter) ? data.slice(0, 6) : data);
            })
            .catch(error => console.error('Error fetching cocktails:', error));
    }, [searchTerm, selectedFilter]);

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
                {cocktails.map(cocktail => (

                    <div key={cocktail._id}>
                        {cocktail.imageUrl && (
                            <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        <Text type="H3" className={styles.h3}>{cocktail.name}</Text>
                        <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                        <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                    </div>
                ))}
            </div>
        </div>
    );
};


{/* <Link to={`/cocktail/${cocktail._id}`} key={cocktail._id}>
{cocktail.imageUrl && (
    <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
)}
<Text type="H3" className={styles.h3}>{cocktail.name}</Text>
<Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
<Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
</Link>
))} */}