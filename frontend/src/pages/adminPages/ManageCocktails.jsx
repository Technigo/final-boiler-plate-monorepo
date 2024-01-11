import { useEffect, useState } from 'react';
import { adminStore } from '../../stores/adminStore';

export const ManageCocktails = () => {
    // Destructuring necessary functions and states from the adminStore
    const {
        cocktails,
        fetchCocktails,
        addCocktail,
        updateCocktail,
        deleteCocktail,
        isLoading,
        errorMessage,
    } = adminStore((state) => ({
        cocktails: state.cocktails,
        fetchCocktails: state.fetchCocktails,
        addCocktail: state.addCocktail,
        updateCocktail: state.updateCocktail,
        deleteCocktail: state.deleteCocktail,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
    }));

    // Local state to manage the selected cocktail for update
    const [selectedCocktail, setSelectedCocktail] = useState(null);

    // Fetch cocktails on component mount
    useEffect(() => {
        fetchCocktails();
    }, [fetchCocktails]);

    // Handler for adding new cocktails
    const handleAddSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await addCocktail(formData);
        event.target.reset(); // Reset the form after submission
    };

    // Handler for updating existing cocktails
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await updateCocktail(selectedCocktail._id, formData);
    };

    // Handler for deleting cocktails with a confirmation dialog
    const handleDelete = async (cocktailId) => {
        if (window.confirm("Are you sure you want to delete this cocktail?")) {
            await deleteCocktail(cocktailId);
        }
    };

    // Handler to set the selected cocktail for update
    const handleCocktailSelect = (event) => {
        const cocktailId = event.target.value;
        const selected = cocktails.find(c => c._id === cocktailId);
        setSelectedCocktail(selected);
    };

    // Render the component
    return (
        <div>
            <h1>Manage Cocktails</h1>
            {errorMessage && <p className="error">Error: {errorMessage}</p>}
            {isLoading && <p>Loading...</p>}

            {/* Form to add a new cocktail */}
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" placeholder="Name" required />
                {/* Add more fields as needed */}
                <input type="file" name="image" />
                <button type="submit">Add Cocktail</button>
            </form>

            {/* Dropdown to select a cocktail for update */}
            <select onChange={handleCocktailSelect}>
                <option value="">Select a cocktail to update</option>
                {cocktails.map(cocktail => (
                    <option key={cocktail._id} value={cocktail._id}>
                        {cocktail.name}
                    </option>
                ))}
            </select>

            {/* Form to update the selected cocktail */}
            {selectedCocktail && (
                <form onSubmit={handleUpdateSubmit}>
                    <input type="text" name="name" defaultValue={selectedCocktail.name} />
                    {/* Add more fields as needed */}
                    <input type="file" name="image" />
                    <button type="submit">Update Cocktail</button>
                </form>
            )}

            {/* List of cocktails with delete options */}
            {cocktails.map(cocktail => (
                <div key={cocktail._id}>
                    {cocktail.name}
                    <button onClick={() => handleDelete(cocktail._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
