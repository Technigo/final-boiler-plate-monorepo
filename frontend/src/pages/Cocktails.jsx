import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cocktails.module.css';
import { Text } from '../UI/Typography';
import { StyledButton } from '../UI/StyledButton';
import lottie from 'lottie-web';

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([]);
    const [displayedCocktails, setDisplayedCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [itemsToDisplay, setItemsToDisplay] = useState(6);
    const [totalCocktails, setTotalCocktails] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const animationContainer = useRef(null);
    const LOTTIE_ANIMATION_PATH = '/animations/Animation - 1705760771667.json';

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };
    const filters = {
        'Liquor': ['Gin', 'Vodka', 'Tequila', 'Rum', 'Whiskey'],
        'Color': ['Red', 'Blue', 'Green', 'Yellow', 'Clear'],
        'Occasion': ['Christmas', 'Summer', 'New Year', 'Halloween'],
        'FlavorProfile': ['Sweet', 'Bitter', 'Sour', 'Spicy']
    };

    useEffect(() => {
        setIsLoading(true);
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: LOTTIE_ANIMATION_PATH
        });
        return () => anim.destroy();
    }, []);

    useEffect(() => {
        let query = '';
        if (searchTerm) {
            query += `search=${encodeURIComponent(searchTerm)}`;
        }
        if (selectedFilter) {
            const [category, value] = selectedFilter.split(':');
            query += (query ? '&' : '') + `${category.toLowerCase()}=${encodeURIComponent(value)}`;
        }

        fetch(`https://cbc-uvko.onrender.com/cocktails${query ? '?' + query : ''}`)
            .then(response => response.json())  // Convert the response to JSON
            .then(data => {
                console.log("Fetched data:", data); // Log the fetched data
                setCocktails(data);
                setDisplayedCocktails(data.slice(0, itemsToDisplay));
                setTotalCocktails(data.length);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cocktails:', error);
                setIsLoading(false);
            });
    }, [searchTerm, selectedFilter, itemsToDisplay]);

    const loadMoreCocktails = () => {
        setItemsToDisplay(prevItems => prevItems + 6);
    };

    return (
        <div className={styles.wrapper}>
            {/* Show loading animation while isLoading is true */}
            {isLoading && (
                <div className={styles.loadContainer}>
                    <div ref={animationContainer} className={styles.lottieContainer}></div>
                    <Text type="H3" className={styles.h3Load}>PLEASE WAIT WHILE OUR RECIPES ARE LOADING</Text>
                </div>
            )}

            {/* Display the content only if isLoading is false */}
            {!isLoading && (
                <>
                    <Text type="H1" className={styles.h1}>EXPLORE OUR COCKTAILS</Text>

                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder=" Search for cocktails..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* TO BE FIXED - FILTERING IN BACKEND */}
                    {/* <div className={styles.dropdowns}>
                        <select
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            className={styles.dropDown}
                        >
                            <option value="">Select Filter</option>
                            {Object.entries(filters).map(([category, values]) => (
                                <optgroup label={category} key={category}>
                                    {values.map(value => (
                                        <option key={value} value={`${category}:${value}`}>{value}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div> */}
                    <div className={styles.placeholder}>
                        <div className={styles.gridContainer}>
                            {displayedCocktails.map(cocktail => (
                                <Link to={`/cocktail/${cocktail._id}`} key={cocktail._id} className={styles.cocktailLink}>
                                    <div>
                                        {cocktail.imageUrl && (
                                            <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                                        )}
                                        {cocktail.name && <Text type="H4" className={styles.h4}>{cocktail.name}</Text>}
                                        <Text type="SbodyText" className={styles.SbodyTextTop}>
                                            <img src="/images/time-icon.png" alt="Prep Time" className={styles.icon} /> {cocktail.prepTime}
                                            <img src="/images/brain.png" alt="Prep Time" className={styles.icon2} /> {cocktail.difficulty}
                                        </Text>
                                        <Text type="SbodyText" className={styles.SbodyTextTop}>
                                            <img src="/images/percent.png" alt="Prep Time" className={styles.icon} /> {cocktail.strength}
                                        </Text>
                                        <Text type="SbodyText" className={styles.SbodyText}>
                                            <img src="/images/tag.png" alt="Prep Time" className={styles.icon} /> {cocktail.tags.join(', ')}
                                        </Text>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {displayedCocktails.length < totalCocktails && (
                            <div className={styles.loadMoreButtonContainer}>
                                <StyledButton onClick={loadMoreCocktails}>
                                    <p>EXPLORE MORE</p>
                                    <p>COCKTAILS</p>
                                </StyledButton>
                            </div>
                        )}
                    </div>
                </>
            )
            }
        </div >
    );
};


















/* SETTING UP ZUSTAND, LOADING 6 AT A TIME NOT WORKING YET */

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Cocktails.module.css';
// import { Text } from '../UI/Typography';
// import { StyledButton } from '../UI/StyledButton';
// import { useNavigate } from 'react-router-dom';
// import useExploreRecipesStore from '../stores/exploreRecipesStore';

// export const Cocktails = () => {
//     const navigate = useNavigate();
//     const {
//         displayedCocktails,
//         loadMoreCocktails,
//         totalCocktails,
//         searchTerm,
//         setSearchTerm,
//         selectedFilter,
//         setSelectedFilter,
//         fetchCocktails
//     } = useExploreRecipesStore();

//     useEffect(() => {
//         fetchCocktails(searchTerm, selectedFilter);

//         // Scroll restoration
//         const timer = setTimeout(() => {
//             const savedPosition = sessionStorage.getItem('scrollPosition');
//             if (savedPosition !== null) {
//                 window.scrollTo(0, parseInt(savedPosition, 10));
//                 sessionStorage.removeItem('scrollPosition');
//             }
//         }, 0);
//         return () => clearTimeout(timer); // Clear timeout on component unmount
//     }, [searchTerm, selectedFilter]);


//     // Handle filter change
//     const handleFilterChange = (e) => {
//         setSelectedFilter(e.target.value);
//     };

//     // Handle cocktail click
//     const handleCocktailClick = (id) => {
//         sessionStorage.setItem('scrollPosition', window.scrollY);
//         navigate(`/cocktail/${id}`);
//     };

//     // Filter options
//     const filters = {
//         'Liquor': ['Gin', 'Vodka', 'Tequila', 'Rum', 'Whiskey'],
//         'Color': ['Red', 'Blue', 'Green', 'Yellow', 'Clear'],
//         'Occasion': ['Christmas', 'Summer', 'New Year', 'Halloween'],
//         'FlavorProfile': ['Sweet', 'Bitter', 'Sour', 'Spicy']
//     };

//     return (
//         <div className={styles.wrapper}>
//             {/* Search Input */}
//             <div className={styles.searchContainer}>
//                 <input
//                     type="text"
//                     placeholder="Search for cocktails..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {/* Dropdown */}
//             <div className={styles.dropdowns}>
//                 <select
//                     value={selectedFilter}
//                     onChange={handleFilterChange}
//                 >
//                     <option value="">Select Filter</option>
//                     {Object.entries(filters).map(([category, values]) => (
//                         <optgroup label={category} key={category}>
//                             {values.map(value => (
//                                 <option key={value} value={`${category}:${value}`}>{value}</option>
//                             ))}
//                         </optgroup>
//                     ))}
//                 </select>
//             </div>

//             <Text type="H1" className={styles.h1}>EXPLORE OUR COCKTAILS</Text>
//             <div className={styles.gridContainer}>
//                 {displayedCocktails.map(cocktail => (
//                     <div onClick={() => handleCocktailClick(cocktail._id)} key={cocktail._id} className={styles.cocktailLink}>
//                         <div>
//                             {cocktail.imageUrl && (
//                                 <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
//                             )}
//                             {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
//                             <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.difficulty}</Text>
//                             <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Load More Button */}
//             {displayedCocktails.length < totalCocktails && (
//                 <div className={styles.loadMoreButtonContainer}>
//                     <StyledButton onClick={loadMoreCocktails}>
//                         Load More
//                     </StyledButton>
//                 </div>
//             )}
//         </div>
//     );
// };


