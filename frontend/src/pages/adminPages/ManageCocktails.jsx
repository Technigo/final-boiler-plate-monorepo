import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cocktailStore } from '../../stores/cocktailStore';
// Update cocktail not working yet, should add a conditional update button as the update coktail button is not showing, only the add cocktail is showing 

export const ManageCocktails = () => {
    const navigate = useNavigate();
    const {
        cocktails,
        addCocktail,
        updateCocktail,
        deleteCocktail,
        fetchCocktails,
        isLoading,
        errorMessage,
    } = cocktailStore((state) => state);

    const [showCocktails, setShowCocktails] = useState(false);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [newCocktailData, setNewCocktailData] = useState({
        name: '',
        primaryLiquor: '',
        allLiquors: '',
        ingredients: '',
        instructions: '',
        category: '',
        color: '',
        ingredientsCount: 0,
        creator: '',
        inspiredByCreator: '',
        occasion: '',
        difficulty: '',
        flavorProfile: '',
        imageUrl: '', // This will be set by the file input
        servings: 0,
        prepTime: '',
        drinkware: '',
        strength: '',
        tags: '',
        description: '',
    });

    useEffect(() => {
        fetchCocktails();
    }, [fetchCocktails]);

    const handleInputChange = (event) => {
        setNewCocktailData({ ...newCocktailData, [event.target.name]: event.target.value });
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(newCocktailData).forEach(key => {
            formData.append(key, newCocktailData[key]);
        });
        await addCocktail(formData);
        // Reset form fields after submission
    };

    const handleEditClick = (cocktail) => {
        setSelectedCocktail(cocktail);
        setNewCocktailData({
            ...cocktail,
            image: '', // Reset image since it's not included in fetched data
        });
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(newCocktailData).forEach(key => {
            formData.append(key, newCocktailData[key]);
        });
        await updateCocktail(selectedCocktail._id, formData);
        // Reset form and clear selected cocktail
        setSelectedCocktail(null);
        setNewCocktailData; // Clear selection after update
    };

    const handleDelete = async (cocktailId) => {
        if (window.confirm("Are you sure you want to delete this cocktail?")) {
            await deleteCocktail(cocktailId);
        }
    };



    return (
        <div>
            <h1>Manage Cocktails</h1>
            <h2>Add New Cocktails</h2>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" placeholder="Name" value={newCocktailData.name} onChange={handleInputChange} required />
                <input type="text" name="primaryLiquor" placeholder="Primary Liquor" value={newCocktailData.primaryLiquor} onChange={handleInputChange} required />
                <input type="text" name="allLiquors" placeholder="All Liquors (comma-separated)" value={newCocktailData.allLiquors} onChange={handleInputChange} required />
                <input type="text" name="ingredients" placeholder="Ingredients (comma-separated)" value={newCocktailData.ingredients} onChange={handleInputChange} required />
                <textarea name="instructions" placeholder="Instructions" value={newCocktailData.instructions} onChange={handleInputChange}></textarea>
                <input type="text" name="category" placeholder="Category" value={newCocktailData.category} onChange={handleInputChange} required />
                <input type="text" name="color" placeholder="Color" value={newCocktailData.color} onChange={handleInputChange} required />
                <input type="number" name="ingredientsCount" placeholder="Ingredients Count" value={newCocktailData.ingredientsCount} onChange={handleInputChange} />
                <input type="text" name="creator" placeholder="Creator" value={newCocktailData.creator} onChange={handleInputChange} required />
                <input type="text" name="occasion" placeholder="Occasion" value={newCocktailData.occasion} onChange={handleInputChange} required />
                <input type="text" name="difficulty" placeholder="Difficulty" value={newCocktailData.difficulty} onChange={handleInputChange} required />
                <input type="text" name="flavorProfile" placeholder="Flavor Profile" value={newCocktailData.flavorProfile} onChange={handleInputChange} required />
                <input type="number" name="servings" placeholder="Servings" value={newCocktailData.servings} onChange={handleInputChange} required />
                <input type="text" name="prepTime" placeholder="Prep Time" value={newCocktailData.prepTime} onChange={handleInputChange} required />
                <input type="text" name="drinkware" placeholder="Drinkware" value={newCocktailData.drinkware} onChange={handleInputChange} />
                <input type="text" name="strength" placeholder="Strength" value={newCocktailData.strength} onChange={handleInputChange} required />
                <input type="text" name="tags" placeholder="Tags (comma-separated)" value={newCocktailData.tags} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" value={newCocktailData.description} onChange={handleInputChange}></textarea>
                <input type="file" name="image" onChange={event => setNewCocktailData({ ...newCocktailData, image: event.target.files[0] })} />

                <button type="submit">Add Cocktail</button>
            </form>

            <h2>Edit or Delete Cocktails</h2>
            {selectedCocktail && (
                <form onSubmit={handleUpdateSubmit}>
                    <input type="text" name="name" value={newCocktailData.name} onChange={handleInputChange} required />
                    <input type="text" name="primaryLiquor" value={newCocktailData.primaryLiquor} onChange={handleInputChange} required />
                    <input type="text" name="allLiquors" value={newCocktailData.allLiquors} onChange={handleInputChange} required />
                    <input type="text" name="ingredients" value={newCocktailData.ingredients} onChange={handleInputChange} required />
                    <textarea name="instructions" value={newCocktailData.instructions} onChange={handleInputChange}></textarea>
                    <input type="text" name="category" value={newCocktailData.category} onChange={handleInputChange} required />
                    <input type="text" name="color" value={newCocktailData.color} onChange={handleInputChange} required />
                    <input type="number" name="ingredientsCount" value={newCocktailData.ingredientsCount} onChange={handleInputChange} />
                    <input type="text" name="creator" value={newCocktailData.creator} onChange={handleInputChange} required />
                    <input type="text" name="inspiredByCreator" value={newCocktailData.inspiredByCreator} onChange={handleInputChange} />
                    <input type="text" name="occasion" value={newCocktailData.occasion} onChange={handleInputChange} required />
                    <input type="text" name="difficulty" value={newCocktailData.difficulty} onChange={handleInputChange} required />
                    <input type="text" name="flavorProfile" value={newCocktailData.flavorProfile} onChange={handleInputChange} required />
                    <input type="number" name="servings" value={newCocktailData.servings} onChange={handleInputChange} required />
                    <input type="text" name="prepTime" value={newCocktailData.prepTime} onChange={handleInputChange} required />
                    <input type="text" name="drinkware" value={newCocktailData.drinkware} onChange={handleInputChange} />
                    <input type="text" name="strength" value={newCocktailData.strength} onChange={handleInputChange} required />
                    <input type="text" name="tags" value={newCocktailData.tags} onChange={handleInputChange} required />
                    <textarea name="description" value={newCocktailData.description} onChange={handleInputChange}></textarea>
                    <input type="file" name="image" onChange={event => setNewCocktailData({ ...newCocktailData, image: event.target.files[0] })} />
                    <button type="submit">Update Cocktail</button>
                </form>
            )}

            <button onClick={() => setShowCocktails(!showCocktails)}>
                {showCocktails ? 'Hide Cocktails' : 'Show Cocktails'}
            </button>
            {showCocktails && (
                <div>
                    {cocktails.map(cocktail => (
                        <div key={cocktail._id}>
                            {cocktail.name}
                            <button onClick={() => handleEditClick(cocktail)}>Edit</button>
                            <button onClick={() => handleDelete(cocktail._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
            <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </div>
    );
};
